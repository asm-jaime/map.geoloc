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

// ========== Users {{{

type (
	User struct {
		Id     bson.ObjectId `form:"_id" bson:"_id,omitempty"`
		Name   string        `form:"name" binding:"required" bson:"name"`
		Text   string        `form:"text" binding:"required" bson:"text"`
		Tags   []string      `form:"tags" bson:"tags"`
		Email  string        `form:"email" binding:"required" bson:"email"`
		Events []mgo.DBRef   `form:"events" bson:"events,omitempty"`
		Groups []mgo.DBRef   `form:"groups" bson:"groups,omitempty"`
	}
)

// }}}

// ========== Events {{{

// Event struct for processing events
type (
	Event struct {
		Id        bson.ObjectId `form:"_id" bson:"_id,omitempty"`
		Name      string        `form:"name" binding:"required" bson:"name"`
		Text      string        `form:"text" bson:"text"`
		Tags      []string      `form:"tags" bson:"tags"`
		TTLEvent  time.Time     `form:"ttl" bson:"ttl,omitempty"`
		Users     []mgo.DBRef   `form:"users" bson:"users,omitempty"`
		Groups    []mgo.DBRef   `form:"groups" bson:"groups,omitempty"`
		Timestamp time.Time     `form:"timestamp" json:"timestamp,omitempty" bson:"timestamp,omitempty"`
	}
)

// }}}

// ========== Groups {{{

type (
	Group struct {
		Id     bson.ObjectId `form:"_id" bson:"_id,omitempty"`
		Name   string        `form:"name" bson:"name,omitempty"`
		Text   string        `form:"text" bson:"text,omitempty"`
		Tags   []string      `form:"tags" bson:"tags,omitempty"`
		Users  []mgo.DBRef   `form:"users" bson:"users,omitempty"`
		Events []mgo.DBRef   `form:"events" bson:"events,omitempty"`
	}

	Groups    []Group
	GroupRefs []mgo.DBRef
)

// }}}

// ========== locs

// id GeoLocation should be id user/event/group
type (
	GeoObject struct {
		Type        string     `json:"type,omitempty"`
		Coordinates [2]float64 `json:"coordinates,omitempty"`
	}

	GeoLocation struct {
		Id       bson.ObjectId `form:"_id" json:"_id,omitempty" bson:"_id,omitempty"`
		Token    string        `form:"token" json:"token,omitempty" bson:"token,omitempty"`
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
		Scope int     `form:"scope" json:"scope,omitempty"`
		TGeos string  `form:"tgeos" json:"tgeos,omitempty"`
		Lat   float64 `form:"lat" json:"lat,omitempty"`
		Lng   float64 `form:"lng" json:"lng,omitempty"`
	}

	ReqFilter struct {
		Scope   int     `form:"scope" json:"scope,omitempty"`
		TGeos   string  `form:"tgeos" json:"tgeos,omitempty"`
		TObject string  `form:"tobject" json:"tobject,omitempty"`
		Lat     float64 `form:"lat" json:"lat,omitempty"`
		Lng     float64 `form:"lng" json:"lng,omitempty"`
	}

	ReqELFilter struct {
		Scope int     `form:"scope" json:"scope,omitempty"`
		Tags  string  `form:"tags" json:"tags,omitempty"`
		TTime string  `form:"ttime" json:"ttime,omitempty"`
		TGeos string  `form:"tgeos" json:"tgeos,omitempty"`
		Lat   float64 `form:"lat" json:"lat,omitempty"`
		Lng   float64 `form:"lng" json:"lng,omitempty"`
	}

	EventLoc struct {
		Id        bson.ObjectId `form:"_id" bson:"_id,omitempty"`
		Name      string        `form:"name" bson:"name,omitempty"`
		Text      string        `form:"text" bson:"text,omitempty"`
		Timestamp time.Time     `form:"timestamp" bson:"timestamp,omitempty"`
		Location  GeoObject     `form:"location" bson:"location,omitempty"`
	}
)

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
		Locations: make(map[bson.ObjectId]GeoLocation),
	}
} // }}}

// Add new point with token {{{
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

// GetLoc new point with token {{{
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
	point.Token = RndStr(8)
	point.TObject = []string{"User", "Event", "Group"}[rnd.Intn(3)]

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
	user.Name = "jhon " + RndStr(4)
	user.Email = RndStr(6) + "@" + RndStr(4) + "." + RndStr(2)
	user.Text = "descr: " + RndStr(10)
	user.Tags = []string{"whoredom", "debauch", "drugs"}[rnd.Intn(3)]
} // }}}

// ========== event

func (event *Event) SetRnd() { // {{{
	rnd := rand.New(rand.NewSource(time.Now().UnixNano()))
	event.Id = bson.NewObjectId()
	event.Name = "event: " + string(event.Id)
	event.Text = "descr: " + RndStr(10)
	event.Tags = []string{"whoredom", "debauch", "drugs"}[rnd.Intn(3)]
	event.Timestamp = time.Now().Add(-time.Duration(rnd.Intn(100)) * time.Hour)
	// event.TTLEvent = time.Now().Add(time.Duration(60) * time.Second)
} // }}}

// ========== groups

func (group *Group) SetRnd() { // {{{
	rnd := rand.New(rand.NewSource(time.Now().UnixNano()))
	group.Id = bson.NewObjectId()
	group.Name = "group: " + string(group.Id)
	group.Text = "descr: " + RndStr(10)
	group.Tags = []string{"whoredom", "debauch", "drugs"}[rnd.Intn(3)]
} // }}}
