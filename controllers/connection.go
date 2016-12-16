package main

import (
	//"bytes"
	//"encoding/json"
	//"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

const (
	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second
	// Time allowed to read the next pong message from the peer.
	pongWait = 60 * time.Second
	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10
	// Maximum message size allowed from peer.
	maxMessageSize = 512
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

// Conn is an middleman between the websocket connection and the hub.
type Conn struct {
	this_socket *websocket.Conn
	// Buffered messages.
	send chan []byte
}

// readPump pumps messages from the websocket connection to the hub.
func (this_connection *Conn) readPump() {
	defer func() {
		hub.unregister <- this_connection
		this_connection.this_socket.Close()
	}()
	this_connection.this_socket.SetReadLimit(maxMessageSize)
	this_connection.this_socket.SetReadDeadline(time.Now().Add(pongWait))
	this_connection.this_socket.SetPongHandler(
		func(string) error {
			this_connection.this_socket.SetReadDeadline(time.Now().Add(pongWait))
			return nil
		})
	for {
		_, message, err := this_connection.this_socket.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway) {
				log.Printf("error: %v", err)
			}
			break
		}
		//some_state := new(GeoState)
		this_state.AddFromJson(message)
		//this_state.PrintPoints()
		hub.broadcast <- message
	}
}

// write writes a message with the given message type and payload.
func (this_connection *Conn) write(mt int, payload []byte) error {
	this_connection.this_socket.SetWriteDeadline(time.Now().Add(writeWait))
	return this_connection.this_socket.WriteMessage(mt, payload)
}

// writePump pumps messages from the hub to the websocket connection.
func (this_connection *Conn) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		this_connection.this_socket.Close()
	}()
	for {
		select {
		case message, ok := <-this_connection.send:
			if !ok {
				this_connection.write(websocket.CloseMessage, []byte{})
				return
			}
			this_connection.this_socket.SetWriteDeadline(time.Now().Add(writeWait))
			this_writer, err := this_connection.this_socket.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			this_writer.Write(message)
			// Add queued chat messages to the current websocket message.
			n := len(this_connection.send)
			for i := 0; i < n; i++ {
				this_writer.Write(newline)
				this_writer.Write(<-this_connection.send)
			}
			if err := this_writer.Close(); err != nil {
				return
			}
		case <-ticker.C:
			if err := this_connection.write(websocket.PingMessage, []byte{}); err != nil {
				return
			}
		}
	}
}

func serveWs(this_writer http.ResponseWriter, this_request *http.Request) {
	this_socket, err := upgrader.Upgrade(this_writer, this_request, nil)
	if err != nil {
		log.Println(err)
		return
	}
	conn := &Conn{send: make(chan []byte, 256), this_socket: this_socket}
	hub.register <- conn
	go conn.writePump()
	conn.readPump()
}

// package main

// import (
// "flag"
// "log"
// "net/http"
// )

// var addr = flag.String("addr", ":8080", "http service address")
// var this_state = NewGeoState()

// func main() {
// go hub.run()
// http.HandleFunc("/ws", serveWs)
// err := http.ListenAndServe(*addr, nil)
// if err != nil {
// log.Fatal("ListenAndServe: ", err)
// }
// }
