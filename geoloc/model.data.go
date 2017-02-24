package geoloc

import (
	"encoding/base64"
	"fmt"
	"math"
	rand "math/rand"
	"sync"
	"time"

	"gopkg.in/mgo.v2/bson"
)

// ========== data section

type TokenReq struct {
	Token string `form:"token" binding:"required"`
}

type DistanceReq struct {
	Distance float64 `form:"distance" binding:"required"`
}

// User user
type User struct {
	ID       string `form:"id"`
	Username string `form:"name"`
	Email    string `form:"email"`
	Descr    string `form:"description"`
}

// Event struct for processing events
type Event struct {
	ID       string    `form:"id"`
	Name     string    `form:"name"`
	Descript string    `form:"description"`
	TTLEvent time.Time `form:"ttl"`
}

// Events array of event
type Events []Event

// GeoPoint for example {lat: 1.011111, lng: 1.0000450}
type GeoPoint struct {
	Type        string     `form:"-"`
	Token       string     `form:"token" binding:"required"`
	Coordinates [2]float64 `form:"coordinates" binding:"required"`
}

// GeoPoints array of event
type GeoPoints []GeoPoint

// GeoState is map(array) of points
type GeoState struct {
	Location map[string]GeoPoint `form:"location" binding:"required"`
	sync.RWMutex
}

// ========== random

// {{{
var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func rndStr(n int) string {
	rnd_str := make([]rune, n)
	for i := range rnd_str {
		rnd_str[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(rnd_str)
}

// RandToken generates a random @length token.
func RandToken(length int) string {
	tbyte := make([]byte, length)
	rand.Read(tbyte)
	return base64.StdEncoding.EncodeToString(tbyte)
} // }}}

// ========== GeoState methods

// NewGeoState will return a new state {{{
func NewGeoState() *GeoState {
	return &GeoState{
		Location: make(map[string]GeoPoint),
	}
} // }}}

// Add new point with token {{{
func (geost *GeoState) Add(point *GeoPoint) {
	geost.Lock()
	defer geost.Unlock()
	geost.Location[point.Token] = *point
} // }}}

// SetRnd fill GeoState the n points {{{
func (geost *GeoState) SetRnd(num int) {
	geost.Lock()
	defer geost.Unlock()

	point := new(GeoPoint)
	for i := 0; i < num; i++ {
		point.SetRnd()
		geost.Location[point.Token] = *point
	}
} // }}}

// Print print poinsts to a dafault stream {{{
func (geost *GeoState) Print() {
	fmt.Print(geost)
} // }}}

// Clear state {{{
func (geost *GeoState) Clear() {
	geost.Lock()
	defer geost.Unlock()

	geost.Location = make(map[string]GeoPoint)
} // }}}

// Len return lenght state {{{
func (geost *GeoState) Len() int {
	return len(geost.Location)
} // }}}

// GetPoint new point with token// {{{
func (geost *GeoState) GetPoint(token string) (point GeoPoint, ok bool) {
	geost.Lock()
	defer geost.Unlock()
	point, ok = geost.Location[token]
	return point, ok
} // }}}

// ========== GeoPoint methods

// NewGeoPoint will return a new point {{{
func NewGeoPoint() *GeoPoint {
	point := new(GeoPoint)
	point.SetRnd()
	return point
} // }}}

// SetRnd set random data to a point {{{
func (point *GeoPoint) SetRnd() {
	point.Type = "Point"
	point.Token = rndStr(8)
	point.Coordinates[0] = (rand.Float64() * 5) + 5
	point.Coordinates[1] = (rand.Float64() * 5) + 5
} // }}}

// GetDistance set random data to a point// {{{
func (point *GeoPoint) GetDistance(toPoint *GeoPoint) (distance float64) {
	distance = math.Sqrt(
		math.Pow(point.Coordinates[0]-toPoint.Coordinates[0], 2) +
			math.Pow(point.Coordinates[1]-toPoint.Coordinates[1], 2))
	return distance
} // }}}

// ========== User methods

// SetRnd set standart params for the user {{{
func (user *User) SetRnd() {
	user.ID = string(bson.NewObjectId())
	user.Username = "jhon " + rndStr(4)
	user.Email = rndStr(6) + "@" + rndStr(4) + "." + rndStr(2)
	user.Descr = "descr: " + rndStr(10)
} // }}}

// ========== Event

// NewEvent will return a new point {{{
func NewEvent() *Event {
	event := new(Event)
	event.SetRnd()
	return event
} // }}}

// SetRnd set all random params for event {{{
func (event *Event) SetRnd() {
	event.ID = string(bson.NewObjectId())
	event.Name = "event: " + event.ID
	event.Descript = "descr: " + rndStr(10)
	event.TTLEvent = time.Now().Add(time.Duration(60) * time.Second)
} // }}}
