package models

import (
	"dvij.geoloc/conf"
	//"encoding/json"
	//"fmt"
	//"gopkg.in/mgo.v2"
	"math/rand"
	"time"

	"gopkg.in/mgo.v2/bson"
)

type DviUser struct {
	Id       bson.ObjectId `bson:"_id,omitempty"`
	Username string        `bson:"name"`
	Descr    string        `bson:"description"`
	Location GeoJson       `bson:"location"`
}

type DviUsers []DviUser

func (this_user *DviUser) InsertDviUser() *conf.ApiError {
	session, api_error := DbSession(conf.MgoConfig())
	if api_error != nil {
		return api_error
	}
	defer session.Close()
	collection := session.DB(conf.MgoDatabase).C("dvi_users")
	err := collection.Insert(this_user)
	if err != nil {
		return conf.ErrInvalidInsert
	}
	return nil
}

func (this_user *DviUser) SetStdParam() {
	this_user.Id = bson.NewObjectId()
	this_user.Username = "jhon doe"
	this_user.Descr = "some descr"
	this_user.Location.Type = "Point"
	rnd := rand.New(rand.NewSource(time.Now().UnixNano()))
	this_user.Location.Coordinates[0] = 50 + rnd.Float64()
	this_user.Location.Coordinates[1] = 50 + rnd.Float64()
}

func MakeArrayUsers(num int) *DviEvents {
	this_event := new(DviEvent)
	this_events := new(DviEvents)
	for i := 0; i < num; i++ {
		this_event.SetStdParam()
		*this_events = append(*this_events, *this_event)
	}
	return this_events
}

func InsertDviUsers(this_users *DviUsers) *conf.ApiError {
	var err error
	session, api_error := DbSession(conf.MgoConfig())
	if api_error != nil {
		return api_error
	}
	defer session.Close()
	collection := session.DB(conf.MgoDatabase).C("dvi_users")
	for _, this_user := range *this_users {
		err = collection.Insert(this_user)
	}
	if err != nil {
		return conf.ErrInvalidInsert
	}
	return nil
}

func UpdateUsersPosition(this_users *DviUsers) *conf.ApiError {
	var err error
	session, api_error := DbSession(conf.MgoConfig())
	if api_error != nil {
		return api_error
	}
	defer session.Close()
	collection := session.DB(conf.MgoDatabase).C("dvi_users")
	for _, this_user := range *this_users {
		err = collection.UpdateId(this_user.Id, this_user)
	}
	if err != nil {
		return conf.ErrInvalidUpdate
	}
	return nil
}

func UpdateUsers() {
}
