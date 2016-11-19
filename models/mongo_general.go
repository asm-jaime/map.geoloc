package models

import (
	"os"

	"dvij.geoloc/conf"
	"dvij.geoloc/utils"
	//"encoding/json"
	"fmt"

	"gopkg.in/mgo.v2"
	//"gopkg.in/mgo.v2/bson"
	//"math/rand"
	"time"
)

func DbSession() *mgo.Session {
	this_config := conf.MgoConfig()
	session, err := mgo.DialWithInfo(this_config)
	if err != nil {
		fmt.Print("error connect to DB")
		os.Exit(1)
	}
	return session
}

func UpsertUserDataBase(username *string, password *string) { // {{{
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
	//err = this_session.DB("test").UpsertUser(thisUser)
	//conf.Check(&err)

} // }}}

func DropDataBase() *conf.ApiError { // {{{
	this_session := utils.DbSession()
	defer this_session.Close()
	err := this_session.DB(conf.MgoDatabase).DropDatabase()
	if err != nil {
		return conf.ErrDatabase
	}
	return nil
} // }}}

func InitStructureDataBase() *conf.ApiError {
	var err error
	this_session := utils.DbSession()
	defer this_session.Close()
	this_session.EnsureSafe(&mgo.Safe{})
	collection := this_session.DB(conf.MgoDatabase).C("dvi_events")
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
	collection = this_session.DB(conf.MgoDatabase).C("dvi_users")
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
}

func StdFillDataBase(num int) *conf.ApiError {
	var err error = nil
	session := utils.DbSession()
	defer session.Close()
	collection := session.DB(conf.MgoDatabase).C("dvi_events")
	this_event := new(DviEvent)
	start := time.Now()
	for i := 0; i < num; i++ {
		this_event.SetStdParam()
		err = collection.Insert(this_event)
		if err != nil {
			return conf.ErrInvalidInsert
		}
	}
	elapsed := time.Since(start)
	fmt.Print('\n' + elapsed)
	//var this_enents []DviEvent
	//collection.Find(bson.M{}).All(&this_enents)
	//fmt.Print(this_enents)
	return nil
}

func MassiveFillDataBase(num int) *conf.ApiError { // {{{
	//session := utils.DbSession()
	//defer session.Close()
	//collection := session.DB(conf.MgoDatabase).C("events")
	this_event := new(DviEvent)
	this_events := new(DviEvents)
	start := time.Now()
	for i := 0; i < num; i++ {
		this_event.SetStdParam()
		*this_events = append(*this_events, *this_event)
	}
	elapsed := time.Since(start)
	fmt.Print('\n' + elapsed)

	fmt.Print('\n' + len(*this_events))
	//start = time.Now()
	//for i := 0; i < 10; i++ {
	//this_events.InsertEvents()
	//}
	//elapsed = time.Since(start)
	//fmt.Print('\n' + elapsed)
	return nil
} // }}}

//.insert({"createdAt": new Date(), "logEvent": 2, "logMessage": "Success!"})

//func ()

//func FixEnsureIndex() *conf.ApiError {
//this_session := utils.DbSession()
//defer this_session.Close()
//this_session.EnsureSafe(&mgo.Safe{})
//collection := this_session.DB(conf.MgoDatabase).C("dvi_events")
//index = mgo.Index{
//Key:         []string{"expireAt"},
//ExpireAfter: 10,
//}
//err := collection.EnsureIndex(index)

////mgo.Session.DB().C().EnsureIndexKey(
//if err != nil {
//return conf.NewApiError(err)
//}
//}
