package mdgeos

import (
	"encoding/base64"
	"fmt"
	"math"
	rand "math/rand"
	"sync"
	"time"

	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// ========== data section

type TokenReq struct {
	Token string `form:"token" binding:"required" bson:"token"`
}

type DistanceReq struct {
	Distance float64 `form:"distance" binding:"required"`
}

// ========== Users{{{

type (
	User struct {
		Id          bson.ObjectId `form:"_id" bson:"_id,omitempty"`
		Name        string        `form:"name" binding:"required" bson:"name"`
		Email       string        `form:"email" binding:"required" bson:"email"`
		Description string        `form:"description" binding:"required" bson:"description"`
		Events      []mgo.DBRef   `form:"events" bson:"events,omitempty"`
		Groups      []mgo.DBRef   `form:"groups" bson:"groups,omitempty"`
	}
)

// }}}

// ========== Events {{{

// Event struct for processing events
type (
	Event struct {
		Id          bson.ObjectId `form:"_id" bson:"_id,omitempty"`
		Name        string        `form:"name" binding:"required" bson:"name"`
		Description string        `form:"description" binding:"required" bson:"description"`
		TTLEvent    time.Time     `form:"ttl" bson:"ttl,omitempty"`
		Users       []mgo.DBRef   `form:"users" bson:"users,omitempty"`
		Groups      []mgo.DBRef   `form:"groups" bson:"groups,omitempty"`
	}
)

// }}}

// ========== Groups {{{

type (
	Group struct {
		Id          bson.ObjectId `form:"_id" bson:"_id,omitempty"`
		Name        string        `form:"name" binding:"required"`
		Description string        `form:"description" binding:"required"`
		Users       []mgo.DBRef   `form:"users" bson:"users,omitempty"`
		Events      []mgo.DBRef   `form:"events" bson:"events,omitempty"`
	}

	Groups    []Group
	GroupRefs []mgo.DBRef
)

// }}}

// ========== Points {{{

// id GeoPoint should be id user/event/group
type (
	GeoPoint struct {
		Id          bson.ObjectId `form:"_id" bson:"_id,omitempty"`
		Type        string        `bson:"-"`
		Token       string        `form:"token" binding:"required" bson:"token,omitempty"`
		Coordinates [2]float64    `form:"coordinates" binding:"required" bson:"coordinates"`
	}

	GeoPoints []GeoPoint

	// GeoState is map(array) of points
	GeoState struct {
		Points map[bson.ObjectId]GeoPoint
		sync.RWMutex
	}
)

// }}}

// ========== random {{{

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func RndStr(n int) string {
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
		Points: make(map[bson.ObjectId]GeoPoint),
	}
} // }}}

// Add new point with token {{{
func (geost *GeoState) Add(point *GeoPoint) {
	geost.Lock()
	defer geost.Unlock()
	geost.Points[point.Id] = *point
} // }}}

// SetRnd fill GeoState the n points {{{
func (geost *GeoState) SetRnd(num int) {
	geost.Lock()
	defer geost.Unlock()

	point := new(GeoPoint)
	for i := 0; i < num; i++ {
		point.SetRnd()
		geost.Points[point.Id] = *point
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

	geost.Points = make(map[bson.ObjectId]GeoPoint)
} // }}}

// Len return lenght state {{{
func (geost *GeoState) Len() int {
	return len(geost.Points)
} // }}}

// GetPoint new point with token {{{
func (geost *GeoState) GetPoint(id bson.ObjectId) (point GeoPoint, ok bool) {
	geost.Lock()
	defer geost.Unlock()
	point, ok = geost.Points[id]
	return point, ok
} // }}}

// ========== GeoPoint

func (point *GeoPoint) SetRnd() { // {{{
	point.Id = bson.NewObjectId()
	point.Token = RndStr(8)
	point.Type = "Point"
	point.Coordinates[0] = (rand.Float64() * 5) + 5
	point.Coordinates[1] = (rand.Float64() * 5) + 5
} // }}}

// GetDistance set random data to a point
func (point *GeoPoint) GetDistance(toPoint *GeoPoint) (distance float64) { // {{{
	distance = math.Sqrt(
		math.Pow(point.Coordinates[0]-toPoint.Coordinates[0], 2) +
			math.Pow(point.Coordinates[1]-toPoint.Coordinates[1], 2))
	return distance
} // }}}

// ========== user

func (user *User) SetRnd() { // {{{
	user.Id = bson.NewObjectId()
	user.Name = "jhon " + RndStr(4)
	user.Email = RndStr(6) + "@" + RndStr(4) + "." + RndStr(2)
	user.Description = "descr: " + RndStr(10)
} // }}}

// ========== event

func (event *Event) SetRnd() { // {{{
	event.Id = bson.NewObjectId()
	event.Name = "event: " + string(event.Id)
	event.Description = "descr: " + RndStr(10)
	// event.TTLEvent = time.Now().Add(time.Duration(60) * time.Second)
} // }}}

// ========== groups

func (group *Group) SetRnd() { // {{{
	group.Id = bson.NewObjectId()
	group.Name = "group: " + string(group.Id)
	group.Description = "descr: " + RndStr(10)
} // }}}
