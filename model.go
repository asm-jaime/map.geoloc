package model

import (
	"fmt"
	"math"
	rand "math/rand"
	"sync"
	"time"

	gen "github.com/asm-jaime/gen"
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

// ========== Users {{{

type (
	User struct {
		Id     bson.ObjectId `form:"_id" bson:"_id,omitempty"`
		Name   string        `form:"name" bson:"name,omitempty"`
		Text   string        `form:"text" bson:"text,omitempty"`
		Tags   []string      `form:"tags" bson:"tags,omitempty"`
		Email  string        `form:"email" bson:"email,omitempty"`
		Events []mgo.DBRef   `form:"events" bson:"events,omitempty"`
	}
)

// }}}

// ========== Events {{{

// Event struct for processing events
type (
	Event struct {
		Id        bson.ObjectId `form:"_id" bson:"_id,omitempty"`
		Name      string        `form:"name" bson:"name,omitempty"`
		Text      string        `form:"text" bson:"text,omitempty"`
		Tags      []string      `form:"tags" bson:"tags,omitempty"`
		TTLEvent  time.Time     `form:"ttl" bson:"ttl,omitempty"`
		Users     []mgo.DBRef   `form:"users" bson:"users,omitempty"`
		Timestamp time.Time     `form:"timestamp" json:"timestamp,omitempty" bson:"timestamp,omitempty"`
	}
)

// }}}

// ========== locs

// id GeoLocation should be id user/event
type (
	GeoObject struct {
		Type        string     `json:"type,omitempty"`
		Coordinates [2]float64 `json:"coordinates,omitempty"`
	}

	GeoLocation struct {
		Id       bson.ObjectId `form:"_id" json:"_id,omitempty" bson:"_id,omitempty"`
		TObject  string        `form:"tobject" json:"tobject,omitempty" bson:"tobject,omitempty"`
		Location GeoObject     `form:"location" json:"location,omitempty" bson:"location,omitempty"`
	}

	GeoLocations []GeoLocation

	// GeoState is map(array) of locs
	GeoState struct {
		Locations map[bson.ObjectId]GeoLocation
		sync.RWMutex
	}

	RespondID struct {
		Id bson.ObjectId `form:"_id" json:"_id,omitempty"`
	}

	ReqGeoEvent struct {
		GeoLoc GeoLocation `form:"geoloc" json:"geoloc,omitempty"`
		Event  Event       `form:"event" json:"event,omitempty"`
	}

	ReqNear struct {
		Scope float64 `form:"scope" json:"scope,omitempty"`
		TGeos string  `form:"tgeos" json:"tgeos,omitempty"`
		Lat   float64 `form:"lat" json:"lat,omitempty"`
		Lng   float64 `form:"lng" json:"lng,omitempty"`
	}

	ReqFilter struct {
		TObject string   `form:"tobject" json:"tobject,omitempty"`
		Scope   float64  `form:"scope" json:"scope,omitempty"`
		TTime   string   `form:"ttime" json:"ttime,omitempty"`
		Tags    []string `form:"tags" json:"tags,omitempty"`
		Lat     float64  `form:"lat" json:"lat,omitempty"`
		Lng     float64  `form:"lng" json:"lng,omitempty"`
	}

	EventLoc struct {
		Id        bson.ObjectId `form:"_id" bson:"_id,omitempty"`
		Name      string        `form:"name" bson:"name,omitempty"`
		Text      string        `form:"text" bson:"text,omitempty"`
		Tags      []string      `form:"tags" bson:"tags,omitempty"`
		TObject   string        `form:"tobject" bson:"tobject,omitempty"`
		Timestamp time.Time     `form:"timestamp" bson:"timestamp,omitempty"`
		Location  GeoObject     `form:"location" bson:"location,omitempty"`
	}
)

// ========== GeoState methods

// NewGeoState will return a new state {{{
func NewGeoState() *GeoState {
	return &GeoState{
		Locations: make(map[bson.ObjectId]GeoLocation),
	}
} // }}}

// Add new point {{{
func (geost *GeoState) Add(point *GeoLocation) {
	geost.Lock()
	defer geost.Unlock()
	geost.Locations[point.Id] = *point
} // }}}

// SetRnd fill GeoState the n locs {{{
func (geost *GeoState) SetRnd(num int) {
	geost.Lock()
	defer geost.Unlock()

	point := new(GeoLocation)
	for i := 0; i < num; i++ {
		point.SetRnd()
		geost.Locations[point.Id] = *point
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

	geost.Locations = make(map[bson.ObjectId]GeoLocation)
} // }}}

// Len return lenght state {{{
func (geost *GeoState) Len() int {
	return len(geost.Locations)
} // }}}

// GetLoc new point {{{
func (geost *GeoState) GetLoc(id bson.ObjectId) (point GeoLocation, ok bool) {
	geost.Lock()
	defer geost.Unlock()
	point, ok = geost.Locations[id]
	return point, ok
} // }}}

// ========== GeoLocation

func (point *GeoLocation) SetRnd() { // {{{
	rnd := rand.New(rand.NewSource(time.Now().UnixNano()))
	point.Id = bson.NewObjectId()
	point.TObject = []string{"User", "Event"}[rnd.Intn(2)]

	point.Location.Type = []string{"Point"}[0]
	//latitude in degrees is -90 and +90
	point.Location.Coordinates[1] = (rnd.Float64() * 180) - 90
	//longitude is in the range -180 and +180
	point.Location.Coordinates[0] = (rnd.Float64() * 360) - 180
} // }}}

func (point *GeoLocation) GetDistance(toPoint *GeoLocation) (distance float64) { // {{{
	distance = math.Sqrt(
		math.Pow(point.Location.Coordinates[0]-toPoint.Location.Coordinates[0], 2) +
			math.Pow(point.Location.Coordinates[1]-toPoint.Location.Coordinates[1], 2))
	return distance
} // }}}

// ========== user

func (user *User) SetRnd() { // {{{
	rnd := rand.New(rand.NewSource(time.Now().UnixNano()))
	user.Id = bson.NewObjectId()
	user.Name = "jhon " + gen.Str(4)
	user.Email = gen.Str(6) + "@" + gen.Str(4) + "." + gen.Str(2)
	user.Text = "descr: " + gen.Str(10)
	user.Tags = []string{[]string{"whoredom", "debauch", "drugs"}[rnd.Intn(3)]}
} // }}}

// ========== event

func (event *Event) SetRnd() { // {{{
	rnd := rand.New(rand.NewSource(time.Now().UnixNano()))
	event.Id = bson.NewObjectId()
	event.Name = "event: " + string(event.Id)
	event.Text = "descr: " + gen.Str(10)
	event.Tags = []string{[]string{"whoredom", "debauch", "drugs"}[rnd.Intn(3)]}
	event.Timestamp = time.Now().Add(-time.Duration(rnd.Intn(100)) * time.Hour)
	// event.TTLEvent = time.Now().Add(time.Duration(60) * time.Second)
} // }}}