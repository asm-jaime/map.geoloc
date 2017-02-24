package geoloc

import (
	"fmt"
	"time"

	"dvij.geoloc/conf"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// MongoDB interface for DataBase struct operations
type MongoDB struct {
	config conf.DbConfig
}

// ========== sessions

// GetSession return a new session if there is no previous one.
func (mongodb *MongoDB) FreeSession() (session *mgo.Session, err error) { // {{{
	session, err = mgo.Dial(mongodb.config.Host)
	return session, err
} // }}}

// Session return a new session
func (mongodb *MongoDB) Session() (session *mgo.Session, err error) { // {{{
	session, err = mgo.DialWithInfo(mongodb.config.Info)
	return session, err
} // }}}

// ========== database init

// UpsertDefaultUser add or update a system user from default data
func (mongodb *MongoDB) UpsertDefaultUser() (err error) { // {{{
	session, err := mongodb.FreeSession()
	if err != nil {
		return err
	}

	user := &mgo.User{
		Username: mongodb.config.Username,
		Password: mongodb.config.Password,
		Roles:    []mgo.Role{},
	}
	err = session.DB(mongodb.config.Database).UpsertUser(user)
	if err != nil {
		return err
	}
	return nil
} // }}}

// Drop DataBase
func (mongodb *MongoDB) Drop() (err error) { // {{{
	session, err := mongodb.Session()
	if err != nil {
		return err
	}

	defer session.Close()
	err = session.DB(mongodb.config.Database).DropDatabase()
	if err != nil {
		return err
	}

	return nil
} // }}}

// Init DataBase structure, set user, password, tables, etc
func (mongodb *MongoDB) Init() (err error) { // {{{
	/* ====================
	   Index params:
	   Unique: causes MongoDB to reject all documents that contain a duplicate value
	   Background:
	   TTL: expire data after a period of time.
	   ==================== */

	err = mongodb.Drop()
	if err != nil {
		return err
	}

	err = mongodb.UpsertDefaultUser()
	if err != nil {
		return err
	}

	session, err := mongodb.Session()
	if err != nil {
		return err
	}

	defer session.Close()
	session.EnsureSafe(&mgo.Safe{})

	collection := session.DB(mongodb.config.Database).C("dviEvents")

	index := mgo.Index{
		Key:        []string{"name", "description"},
		Unique:     false,
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

	// ExpireAfter: mongodb.config.EventTTLAfterEnd,
	index = mgo.Index{
		Key:         []string{"ttl"},
		ExpireAfter: time.Duration(1) * time.Second,
	}
	err = collection.EnsureIndex(index)
	if err != nil {
		return conf.ErrDatabase
	}

	collection = session.DB(mongodb.config.Database).C("dviUsers")

	index = mgo.Index{
		Key:        []string{"id", "name", "email", "description"},
		Unique:     false,
		Background: true,
		Sparse:     true,
	}
	err = collection.EnsureIndex(index)
	if err != nil {
		return conf.ErrDatabase
	}

	collection = session.DB(mongodb.config.Database).C("dviPoints")

	index = mgo.Index{
		Key:        []string{"id", "user_id", "event_id", "group_id"},
		Unique:     false,
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

// FillRnd random data on db
func (mongodb *MongoDB) FillRnd(num int) (err error) { // {{{
	session, err := mongodb.Session()
	if err != nil {
		return err
	}

	defer session.Close()

	collection := session.DB(mongodb.config.Database).C("dviEvents")
	event := new(Event)
	for i := 0; i < num; i++ {
		event.SetRnd()
		err = collection.Insert(event)
		if err != nil {
			return err
		}
	}

	collection = session.DB(mongodb.config.Database).C("dviPoints")
	point := new(GeoPoint)
	for i := 0; i < num; i++ {
		point.SetRnd()
		err = collection.Insert(point)
		if err != nil {
			return err
		}
	}

	return nil
} // }}}

// ========== user

// InsertUser register a user so we know that we saw that user already.
func (mongodb *MongoDB) InsertUser(user *User) (err error) { // {{{
	session, err := mongodb.Session()
	if err != nil {
		return err
	}

	defer session.Close()
	if _, err := mongodb.LoadUser(user.Email); err == nil {
		return fmt.Errorf("User already exists!")
	}

	collection := session.DB(mongodb.config.Database).C("dviUsers")
	err = collection.Insert(user)
	return err
} // }}}

// LoadUser get user on email
func (mongodb *MongoDB) LoadUser(Email string) (user User, err error) { // {{{
	session, err := mongodb.Session()
	if err != nil {
		return user, err
	}

	defer session.Close()
	collection := session.DB(mongodb.config.Database).C("dviUsers")
	err = collection.Find(bson.M{"email": Email}).One(&user)
	return user, err
} // }}}

// ========== event

func (mongodb *MongoDB) InsertEvent(event *Event) (err error) { // {{{
	session, err := mongodb.Session()
	if err != nil {
		return err
	}

	defer session.Close()

	collection := session.DB(mongodb.config.Database).C("dviEvents")
	err = collection.Insert(event)
	return err
} // }}}

func (mongodb *MongoDB) GetEvents() (events Events, err error) { // {{{
	session, err := mongodb.Session()
	if err != nil {
		return events, err
	}

	defer session.Close()

	err = session.DB(mongodb.config.Database).C("dviEvents").Find(bson.M{}).All(&events)
	return events, err
} // }}}

// ========== point

func (mongodb *MongoDB) InsertPoint(point *GeoPoint) (err error) { // {{{
	session, err := mongodb.Session()
	if err != nil {
		return err
	}

	defer session.Close()

	collection := session.DB(mongodb.config.Database).C("dviPoints")
	err = collection.Insert(point)
	return err
} // }}}

func (mongodb *MongoDB) GetAllPoints() (points GeoPoints, err error) { // {{{
	session, err := mongodb.Session()
	if err != nil {
		return points, err
	}

	defer session.Close()

	err = session.DB(mongodb.config.Database).C("dviPoints").Find(bson.M{}).All(&points)
	return points, err
} // }}}

// ========== geostate

func (mongodb *MongoDB) InsertGeoState(geost *GeoState) (err error) { // {{{
	session, err := mongodb.Session()
	if err != nil {
		return err
	}

	defer session.Close()

	collection := session.DB(mongodb.config.Database).C("dviPoints")
	for point := range geost.Location {
		err = collection.Insert(point)
	}

	return err
} // }}}

func (mongodb *MongoDB) GetGeoState() (geost GeoState, err error) { // {{{
	var points GeoPoints
	session, err := mongodb.Session()
	if err != nil {
		return geost, err
	}

	defer session.Close()

	err = session.DB(mongodb.config.Database).C("dviPoints").Find(bson.M{}).All(&points)

	for _, point := range points {
		geost.Location[point.Token] = point
	}
	return geost, err
} // }}}
