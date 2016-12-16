package models

import (
	"fmt"

	"dvij.geoloc/conf"
	// "fmt"
	"math/rand"
	"time"

	"sync"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// DviEvent struct for processing events
type DviEvent struct {
	ID        bson.ObjectId       `bson:"Id,omitempty"`
	Eventname string              `bson:"name"`
	Descr     string              `bson:"description"`
	Location  GeoPoint            `bson:"location"`
	TTLEvent  time.Time           `bson:"ttl"`
	Users     map[string]DviUsers `bson:"users"`
}

// DviEvents map for events
type DviEvents struct {
	Events map[string]DviEvent `json:"event"`
	sync.RWMutex
}

// GetNEvents set n events from db
func (thisEvents *DviEvents) GetNEvents(numScan int) ([]byte, *conf.ApiError) { // {{{
	thisEvents.Lock()
	defer thisEvents.Unlock()

	session, apiError := DbSession(conf.MgoConfig())
	if apiError != nil {
		return nil, apiError
	}
	defer session.Close()

	var erro error

	if numScan > 0 {
		erro = session.DB(conf.MgoDatabase).C("dviEvents").Find(bson.M{}).SetMaxScan(numScan).All(&thisEnents)
	} else {
		erro = session.DB(conf.MgoDatabase).C("dviEvents").Find(bson.M{}).All(&thisEnents)
	}
	if erro != nil {
		return nil, conf.ErrDatabase
	}
} // }}}

// GetGeoNearPoint return all points around scope
func GetGeoNearPoint(long float64, lat float64, scope int) *conf.ApiError { // {{{
	//thisEnents := new(DviEvents)
	var results []DviEvent
	thisSession, apiError := DbSession(conf.MgoConfig())
	if apiError != nil {
		return apiError
	}
	defer thisSession.Close()
	thisSession.SetMode(mgo.Monotonic, true)
	collection := thisSession.DB(conf.MgoDatabase).C("dviEvents")
	start := time.Now()
	//err := thisSession.DB(conf.MgoDatabase).C("events").Find(bson.M{}).All(thisEnents)
	//{location: { $nearSphere: { $geometry: { type: "Point", coordinates: [50.5, 50.5], }, $maxDistance : 5000 } } }
	err := collection.Find(bson.M{
		"location": bson.M{
			"$nearSphere": bson.M{
				"$geometry": bson.M{
					"type":        "Point",
					"coordinates": []float64{long, lat},
				},
				"$maxDistance": scope,
			},
		},
	}).All(&results)
	elapsed := time.Since(start)
	fmt.Print('\n' + elapsed)
	fmt.Print(len(results))
	if err != nil {
		return conf.ErrInvalidFind
	}
	return nil
} // }}}

// InsertDviEvent insert thisEvent
func (thisEvent *DviEvent) InsertDviEvent() *conf.ApiError { // {{{
	session, apiError := DbSession(conf.MgoConfig())
	if apiError != nil {
		return apiError
	}
	defer session.Close()
	collection := session.DB(conf.MgoDatabase).C("dviEvents")
	err := collection.Insert(thisEvent)
	if err != nil {
		return conf.ErrDatabase
	}
	return nil
} // }}}

// Update thisEvent
func (thisEvent *DviEvent) Update() *conf.ApiError { // {{{
	session, apiError := DbSession(conf.MgoConfig())
	if apiError != nil {
		return apiError
	}
	defer session.Close()
	collection := session.DB(conf.MgoDatabase).C("dviEvents")
	err := collection.UpdateId(thisEvent.ID, thisEvent)
	if err != nil {
		return conf.ErrDatabase
	}
	return nil
} // }}}

// InsertDviEvents bulk insert into db
func InsertDviEvents(thisEvents *DviEvents) *conf.ApiError {
	var err error
	session, apiError := DbSession(conf.MgoConfig())
	if apiError != nil {
		return apiError
	}
	defer session.Close()
	collection := session.DB(conf.MgoDatabase).C("dviEvents")
	for iterator, thisEvent := range *thisEvents {
		// type of i is int
		// type of s is string
		// s == a[i]
		fmt.Print("\n")
		fmt.Print(iterator)
		fmt.Print("\n")
		fmt.Print(thisEvent)
		err = collection.Insert(thisEvent)
	}

	if err != nil {
		return conf.ErrInvalidInsert
	}
	return nil
}

// UpdateTrack bulk insert events to db
func UpdateTrack() {
}

// SetTTLForAEvent set time alive for event
func (thisEvent *DviEvent) SetTTLForAEvent() {
	//thisEvent.TimeToLiveEvent = time.Now().Add(60 * time.Second)
	//time.Se

}

// MakeArrayEventsV1 return random array
func MakeArrayEventsV1(num int) *DviEvents {
	thisEvent := new(DviEvent)
	thisEvents := new(DviEvents)
	for i := 0; i < num; i++ {
		thisEvent.SetStdParam()
		*thisEvents = append(*thisEvents, *thisEvent)
	}
	return thisEvents
}

// SetStdParam set all random params for event
func (thisEvent *DviEvent) SetStdParam() {
	thisEvent.ID = bson.NewObjectId()
	thisEvent.Eventname = "some event"
	thisEvent.Descr = "some descr"
	thisEvent.Location.Type = "Point"
	thisEvent.TTLEvent = time.Now().Add(conf.StdEventTTL)
	rnd := rand.New(rand.NewSource(time.Now().UnixNano()))
	thisEvent.Location.Coordinates[0] = 50 + rnd.Float64()
	thisEvent.Location.Coordinates[1] = 50 + rnd.Float64()
}

// InsertArrayEvents bulk insert events
func InsertArrayEvents(thisEvents *DviEvents) *conf.ApiError {
	//fmt.Print(thisEvents...)
	return nil
}
