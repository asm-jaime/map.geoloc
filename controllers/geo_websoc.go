package controllers

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
	thisSocket *websocket.Conn
	// Buffered messages.
	send chan []byte
}

// readPump pumps messages from the websocket connection to the hub.
func (thisConnection *Conn) readPump() {
	defer func() {
		hub.unregister <- thisConnection
		thisConnection.thisSocket.Close()
	}()
	thisConnection.thisSocket.SetReadLimit(maxMessageSize)
	thisConnection.thisSocket.SetReadDeadline(time.Now().Add(pongWait))
	thisConnection.thisSocket.SetPongHandler(
		func(string) error {
			thisConnection.thisSocket.SetReadDeadline(time.Now().Add(pongWait))
			return nil
		})
	for {
		_, message, err := thisConnection.thisSocket.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway) {
				log.Printf("error: %v", err)
			}
			break
		}
		// thisPoint := new(models.GeoPoint)
		// thisPoint.AddFromJSON(message)
		//thisState.PrintPoints()
		hub.broadcast <- message
	}
}

// write writes a message with the given message type and payload.
func (thisConnection *Conn) write(mt int, payload []byte) error {
	thisConnection.thisSocket.SetWriteDeadline(time.Now().Add(writeWait))
	return thisConnection.thisSocket.WriteMessage(mt, payload)
}

// writePump pumps messages from the hub to the websocket connection.
func (thisConnection *Conn) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		thisConnection.thisSocket.Close()
	}()
	for {
		select {
		case message, ok := <-thisConnection.send:
			if !ok {
				thisConnection.write(websocket.CloseMessage, []byte{})
				return
			}
			thisConnection.thisSocket.SetWriteDeadline(time.Now().Add(writeWait))
			thisWriter, err := thisConnection.thisSocket.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			thisWriter.Write(message)
			// Add queued chat messages to the current websocket message.
			n := len(thisConnection.send)
			for i := 0; i < n; i++ {
				thisWriter.Write(newline)
				thisWriter.Write(<-thisConnection.send)
			}
			if err := thisWriter.Close(); err != nil {
				return
			}
		case <-ticker.C:
			if err := thisConnection.write(websocket.PingMessage, []byte{}); err != nil {
				return
			}
		}
	}
}

func serveWs(thisWriter http.ResponseWriter, thisRequest *http.Request) {
	thisSocket, err := upgrader.Upgrade(thisWriter, thisRequest, nil)
	if err != nil {
		log.Println(err)
		return
	}
	conn := &Conn{send: make(chan []byte, 256), thisSocket: thisSocket}
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
// var thisState = NewGeoState()

// func main() {
// go hub.run()
// http.HandleFunc("/ws", serveWs)
// err := http.ListenAndServe(*addr, nil)
// if err != nil {
// log.Fatal("ListenAndServe: ", err)
// }
// }
