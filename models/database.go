// DataBase functional (sessions, initialisation, transformation)

package models

import (
	"fmt"
	"pulls/mgo/bson"

	"dvij.geoloc/conf"
	//"encoding/json"

	"gopkg.in/mgo.v2"
	//"gopkg.in/mgo.v2/bson"
	//"math/rand"
)

// DviMongoDB interface for DataBase struct operations
type DviMongoDB struct {
	session *mgo.Session
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
func (mongodb *DviMongoDB) UpsertUser(username *string, password *string) { // {{{
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
func (mongodb *DviMongoDB) Drop() *conf.ApiError { // {{{
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
func (mongodb *DviMongoDB) Init() *conf.ApiError { // {{{
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
func (mongodb *DviMongoDB) FillRndV1(num int) *conf.ApiError { // {{{
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
func (mongodb *DviMongoDB) FillRnd(num int) *conf.ApiError { // {{{
	thisEvents := NewEvents()
	thisEvents.FillRnd(10)
	thisEvents.InsertDviEvents()
	return nil
} // }}}

// SaveUser register a user so we know that we saw that user already.
func (mongodb *DviMongoDB) SaveUser(user *DviUser) error {
	mongodb.session = mongodb.GetSession()
	defer mongodb.session.Close()
	if _, err := mongodb.LoadUser(user.Email); err == nil {
		return fmt.Errorf("User already exists!")
	}
	category := mongodb.session.DB("webadventure").C("users")
	err := category.Insert(user)
	return err
}

// LoadUser get data from a user.
func (mongodb *DviMongoDB) LoadUser(Email string) (result DviUser, err error) {
	mongodb.session = mongodb.GetSession()
	defer mongodb.session.Close()
	c := mongodb.session.DB("webadventure").C("users")
	err = c.Find(bson.M{"email": Email}).One(&result)
	return result, err
}

// GetSession return a new session if there is no previous one.
func (mongodb *DviMongoDB) GetSession() *mgo.Session {
	if mongodb.session != nil {
		return mongodb.session.Copy()
	}
	session, err := mgo.Dial("localhost")
	if err != nil {
		panic(err)
	}
	session.SetMode(mgo.Monotonic, true)
	return session
}
