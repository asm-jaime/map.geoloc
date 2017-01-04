package models

import (
	"encoding/json"

	"dvij.geoloc/conf"
	// "fmt"

	"time"

	"sync"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// DviEvent struct for processing events
type DviEvent struct {
	ID       bson.ObjectId   `bson:"Id,omitempty"`
	Name     string          `bson:"name"`
	Descript string          `bson:"description"`
	Location GeoPoint        `bson:"location"`
	TTLEvent time.Time       `bson:"ttl"`
	Users    []bson.ObjectId `bson:"users"`
}

// DviEvents map for events
type DviEvents struct {
	Events map[string]DviEvent `json:"event"`
	sync.RWMutex
}

// NewEvents make new empty state for events
func NewEvents() *DviEvents { // {{{
	return &DviEvents{
		Events: make(map[string]DviEvent),
	}
} // }}}

// GetNEvents set n events from db
func (thisEvents *DviEvents) GetNEvents(numScan int) *conf.APIError { // {{{
	thisEvents.Lock()
	defer thisEvents.Unlock()

	session, apiError := DbSession(conf.MgoConfig())
	if apiError != nil {
		return apiError
	}
	defer session.Close()

	var erro error

	if numScan > 0 {
		erro = session.DB(conf.MgoDatabase).C("dviEvents").Find(bson.M{}).SetMaxScan(numScan).All(&thisEvents)
	} else {
		erro = session.DB(conf.MgoDatabase).C("dviEvents").Find(bson.M{}).All(&thisEvents)
	}
	if erro != nil {
		return conf.ErrDatabase
	}
	return nil
} // }}}

// GetAsJSON set n events from db
func (thisEvents *DviEvents) GetAsJSON() ([]byte, *conf.APIError) { // {{{
	thisEvents.Lock()
	defer thisEvents.Unlock()
	jsonBytes, err := json.Marshal(thisEvents)

	if err != nil {
		return nil, conf.ErrJSON
	}
	return jsonBytes, nil
} // }}}

// GetEventsNearPoint return all points around scope
func (thisEvents *DviEvents) GetEventsNearPoint(long float64, lat float64, scope int) *conf.APIError { // {{{
	thisEvents.Lock()
	defer thisEvents.Unlock()

	thisSession, apiError := DbSession(conf.MgoConfig())
	if apiError != nil {
		return apiError
	}

	defer thisSession.Close()
	thisSession.SetMode(mgo.Monotonic, true)

	collection := thisSession.DB(conf.MgoDatabase).C("dviEvents")
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
	}).All(&thisEvents)
	if err != nil {
		return conf.ErrInvalidFind
	}
	return nil
} // }}}

// InsertDviEvent insert thisEvent
func (thisEvent *DviEvent) InsertDviEvent() *conf.APIError { // {{{
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
func (thisEvent *DviEvent) Update() *conf.APIError { // {{{
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
func (thisEvents *DviEvents) InsertDviEvents() *conf.APIError { // {{{
	thisEvents.Lock()
	defer thisEvents.Unlock()

	var err error
	session, apiError := DbSession(conf.MgoConfig())
	if apiError != nil {
		return apiError
	}

	defer session.Close()
	collection := session.DB(conf.MgoDatabase).C("dviEvents")

	for _, thisEvent := range (*thisEvents).Events {
		err = collection.Insert(thisEvent)
	}

	if err != nil {
		return conf.ErrInvalidInsert
	}
	return nil
} // }}}

// SetTTLForAEvent set time alive for event
func (thisEvent *DviEvent) SetTTLForAEvent() {
	//thisEvent.TimeToLiveEvent = time.Now().Add(60 * time.Second)
	//time.Se

}

// FillRnd fill rnd for this events
func (thisEvents *DviEvents) FillRnd(num int) { // {{{
	thisEvents.Lock()
	defer thisEvents.Unlock()

	var thisID string
	thisEvents = NewEvents()
	thisEvent := new(DviEvent)
	for i := 0; i < num; i++ {
		thisEvent.SetRnd()
		thisID = thisEvent.ID.String()
		thisEvents.Events[thisID] = *thisEvent
	}
} // }}}

// SetRnd set all random params for event
func (thisEvent *DviEvent) SetRnd() { // {{{
	thisEvent.ID = bson.NewObjectId()
	thisEvent.Name = "some event"
	thisEvent.Descript = "some descr"
	thisEvent.TTLEvent = time.Now().Add(conf.StdEventTTL)
	// rnd := rand.New(rand.NewSource(time.Now().UnixNano()))
	thisEvent.Location.SetRnd()
} // }}}

// InsertArrayEvents bulk insert events
func (thisEvents *DviEvents) InsertArrayEvents() *conf.APIError {
	//fmt.Print(thisEvents...)
	return nil
}

// UpdateTrack update position events to db
func UpdateTrack() {
}
