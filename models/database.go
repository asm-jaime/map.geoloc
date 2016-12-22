// DataBase functional (sessions, initialisation, transformation)

package models

import (
	"dvij.geoloc/conf"
	//"encoding/json"

	"gopkg.in/mgo.v2"
	//"gopkg.in/mgo.v2/bson"
	//"math/rand"
)

// DviMongoDB interface for DataBase struct operations
type DviMongoDB struct {
}

// DbSession return session
func DbSession(thisConfig *mgo.DialInfo) (*mgo.Session, *conf.ApiError) { // {{{
	thisSession, err := mgo.DialWithInfo(thisConfig)
	if err != nil {
		return thisSession, conf.ErrSession
	}
	return thisSession, nil
} // }}}

// UpsertUser upser this user
func (thisDB *DviMongoDB) UpsertUser(username *string, password *string) { // {{{
	//thisUser := &mgo.User{
	//Username: conf.ThisUsername,
	//Password: conf.ThisPassword,
	//Roles:    []mgo.Role{},
	//}
	//err := collection.Database.UpsertUser(thisUser)
	//thisUser := &mgo.User{
	//Username: "jaime",
	//Password: "123456789",
	//Roles:    []mgo.Role{},
	//}
	//err = thisSession.DB("test").UpsertUser(thisUser)
	//conf.Check(&err)

} // }}}

// Drop DataBase
func (thisDB *DviMongoDB) Drop() *conf.ApiError { // {{{
	thisSession, apiError := DbSession(conf.MgoConfig())
	if apiError != nil {
		return apiError
	}

	defer thisSession.Close()
	err := thisSession.DB(conf.MgoDatabase).DropDatabase()
	if err != nil {
		return conf.ErrDatabase
	}

	return nil
} // }}}

// Init DataBase structure, set user, password, tables, etc
func (thisDB *DviMongoDB) Init() *conf.ApiError { // {{{
	var err error
	thisSession, apiError := DbSession(conf.MgoConfig())
	if apiError != nil {
		return apiError
	}
	defer thisSession.Close()
	thisSession.EnsureSafe(&mgo.Safe{})
	collection := thisSession.DB(conf.MgoDatabase).C("dviEvents")
	index := mgo.Index{
		Key:        []string{"name", "description", "users"},
		Unique:     false,
		DropDups:   false,
		Background: true,
		Sparse:     true,
	}
	err = collection.EnsureIndex(index)
	if err != nil {
		return conf.ErrDatabase
	}
	index = mgo.Index{
		Key:  []string{"$2dsphere:location"},
		Bits: 26,
	}
	err = collection.EnsureIndex(index)
	if err != nil {
		return conf.ErrDatabase
	}
	index = mgo.Index{
		Key:         []string{"ttl"},
		ExpireAfter: conf.EventTTLAfterEnd,
	}
	err = collection.EnsureIndex(index)
	if err != nil {
		return conf.ErrDatabase
	}
	collection = thisSession.DB(conf.MgoDatabase).C("dviUsers")
	index = mgo.Index{
		Key:        []string{"id", "name", "description"},
		Unique:     true,
		DropDups:   true,
		Background: true,
		Sparse:     true,
	}
	err = collection.EnsureIndex(index)
	if err != nil {
		return conf.ErrDatabase
	}
	index = mgo.Index{
		Key:  []string{"$2dsphere:location"},
		Bits: 26,
	}
	err = collection.EnsureIndex(index)
	if err != nil {
		return conf.ErrDatabase
	}
	return nil
} // }}}

// FillRndV1 fill all data with no DviEvents
func (thisDB *DviMongoDB) FillRndV1(num int) *conf.ApiError { // {{{
	var err error
	session, apiError := DbSession(conf.MgoConfig())
	if apiError != nil {
		return apiError
	}
	defer session.Close()
	collection := session.DB(conf.MgoDatabase).C("dviEvents")
	thisEvent := new(DviEvent)
	for i := 0; i < num; i++ {
		thisEvent.SetRnd()
		err = collection.Insert(thisEvent)
		if err != nil {
			return conf.ErrInvalidInsert
		}
	}
	return nil
} // }}}

// FillRnd with random data
func (thisDB *DviMongoDB) FillRnd(num int) *conf.ApiError { // {{{
	thisEvents := NewEvents()
	thisEvents.FillRnd(10)
	thisEvents.InsertDviEvents()
	return nil
} // }}}
