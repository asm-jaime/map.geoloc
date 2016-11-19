package models

import (
	"encoding/json"
	"fmt"

	"dvij.geoloc/conf"
	"dvij.geoloc/utils"
	// "fmt"
	"math/rand"
	"time"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type GeoJson struct {
	Type        string     `json:"-"`
	Coordinates [2]float64 `json:"coordinates"`
}

type DviEvent struct {
	Id        bson.ObjectId `bson:"_id,omitempty"`
	Eventname string        `bson:"name"`
	Descr     string        `bson:"description"`
	Location  GeoJson       `bson:"location"`
	TTLEvent  time.Time     `bson:"ttl"`
	Users     ArrIdUsers    `bson:"users"`
}

type ArrIdUsers []bson.ObjectId

type DviEvents []DviEvent

func GetNEvents(num_scan int) ([]byte, *conf.ApiError) { // {{{
	this_enents := new(DviEvents)
	session := utils.NewDbSession()
	defer session.Close()
	var erro error
	if num_scan > 0 {
		erro = session.DB(conf.MgoDatabase).C("dvi_events").Find(bson.M{}).SetMaxScan(num_scan).All(&this_enents)
	} else {
		erro = session.DB(conf.MgoDatabase).C("dvi_events").Find(bson.M{}).All(&this_enents)
	}
	if erro != nil {
		return nil, conf.ErrDatabase
	}
	jsonBytes, err := json.Marshal(this_enents)
	if err != nil {
		return nil, conf.ErrJson
	}
	return jsonBytes, nil
} // }}}

func GetGeoNearPoint(long float64, lat float64, scope int) *conf.ApiError { // {{{
	//this_enents := new(DviEvents)
	var results []DviEvent
	this_session := utils.NewDbSession()
	defer this_session.Close()
	this_session.SetMode(mgo.Monotonic, true)
	collection := this_session.DB(conf.MgoDatabase).C("dvi_events")
	start := time.Now()
	//err := this_session.DB(conf.MgoDatabase).C("events").Find(bson.M{}).All(this_enents)
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

func (this_event *DviEvent) InsertDviEvent() *conf.ApiError { // {{{
	session := utils.NewDbSession()
	defer session.Close()
	collection := session.DB(conf.MgoDatabase).C("dvi_events")
	err := collection.Insert(this_event)
	if err != nil {
		return conf.ErrDatabase
	}
	return nil
} // }}}

func (this_event *DviEvent) Update() *conf.ApiError { // {{{
	session := utils.NewDbSession()
	defer session.Close()
	collection := session.DB(conf.MgoDatabase).C("dvi_events")
	err := collection.UpdateId(this_event.Id, this_event)
	if err != nil {
		return conf.ErrDatabase
	}
	return nil
} // }}}

func InsertDviEvents(this_events *DviEvents) *conf.ApiError {
	var err error
	session := utils.NewDbSession()
	defer session.Close()
	collection := session.DB(conf.MgoDatabase).C("dvi_events")
	for iterator, this_event := range *this_events {
		// type of i is int
		// type of s is string
		// s == a[i]
		fmt.Print("\n")
		fmt.Print(iterator)
		fmt.Print("\n")
		fmt.Print(this_event)
		err = collection.Insert(this_event)
	}

	if err != nil {
		return conf.ErrInvalidInsert
	}
	return nil
}

func UpdateTrack() {
}

func (this_event *DviEvent) SetTTLForAEvent() {
	//this_event.TimeToLiveEvent = time.Now().Add(60 * time.Second)
	//time.Se

}

func MakeArrayEvents(num int) *DviEvents {
	this_event := new(DviEvent)
	this_events := new(DviEvents)
	for i := 0; i < num; i++ {
		this_event.SetStdParam()
		*this_events = append(*this_events, *this_event)
	}
	return this_events
}

func (this_event *DviEvent) SetStdParam() {
	this_event.Id = bson.NewObjectId()
	this_event.Eventname = "some event"
	this_event.Descr = "some descr"
	this_event.Location.Type = "Point"
	this_event.TTLEvent = time.Now().Add(conf.StdEventTTL)
	rnd := rand.New(rand.NewSource(time.Now().UnixNano()))
	this_event.Location.Coordinates[0] = 50 + rnd.Float64()
	this_event.Location.Coordinates[1] = 50 + rnd.Float64()
}

//func MakeInterfaceEvents(num int) *DviEvents {
//this_event := new(DviEvent)
//this_event.SetStdParam()
////this_events := make(DviEvent, num)
////for i := 0; i < num; i++ {
////this_events[i] = this_event.SetStdParam()
////}
//this_events := []DviEvent{*this_event, *this_event, *this_event}
//return this_events
//}

func InsertArrayEvents(this_events *DviEvents) *conf.ApiError {
	//fmt.Print(this_events...)
	return nil
}
