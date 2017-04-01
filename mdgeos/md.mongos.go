package geoloc

import (
	"errors"
	"fmt"
	"time"

	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// ========== configure

// MongoDB config struct
type MongoDB struct {
	Host             string
	Port             string
	Addrs            string
	Database         string
	Username         string
	Password         string
	EventTTLAfterEnd time.Duration
	StdEventTTL      time.Duration
	Info             *mgo.DialInfo
}

func (mongo *MongoDB) SetDefault() { // {{{
	// host database params
	mongo.Port = "27017"
	mongo.Host = "localhost"
	mongo.Addrs = mongo.Host + ":" + mongo.Port
	// database
	mongo.Database = "dviMongo"
	// user for requests
	mongo.Username = "jaime"
	mongo.Password = "123456789"
	// time live events
	mongo.EventTTLAfterEnd = 1 * time.Second
	mongo.StdEventTTL = 20 * time.Minute
	mongo.Info = &mgo.DialInfo{
		Addrs:    []string{mongo.Addrs},
		Timeout:  60 * time.Second,
		Database: mongo.Database,
		Username: mongo.Username,
		Password: mongo.Password,
	}
} // }}}

// ========== sessions

// GetSession return a new session if there is no previous one.
func (mongo *MongoDB) FreeSession() (session *mgo.Session, err error) { // {{{
	session, err = mgo.Dial(mongo.Host)
	return session, err
} // }}}

// Session return a new session
func (mongo *MongoDB) Session() (session *mgo.Session, err error) { // {{{
	session, err = mgo.DialWithInfo(mongo.Info)
	return session, err
} // }}}

// ========== database init

func StartInitDB() { // {{{
	database = &MongoDB{}
	database.config.SetDefault()
	err := database.Init()
	if err != nil {
		fmt.Printf("\nerror init database: %v\n", err)
	} else {
		fmt.Printf("\ninit database sucess: \n%v\n", database.config)
	}
} // }}}

func (mongo *MongoDB) UpsertDefaultUser() (err error) { // {{{
	session, err := mongodb.FreeSession()
	if err != nil {
		return err
	}

	user := &mgo.User{
		Username: mongo.Username,
		Password: mongo.Password,
		Roles:    []mgo.Role{},
	}
	err = session.DB(mongo.Database).UpsertUser(user)
	if err != nil {
		return err
	}
	return nil
} // }}}

func (mongo *MongoDB) Drop() (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}

	defer session.Close()
	err = session.DB(mongo.Database).DropDatabase()
	if err != nil {
		return err
	}

	return nil
} // }}}

func (mongo *MongoDB) Init() (err error) { // {{{
	/* ====================
	   Index params:
	   Unique: causes MongoDB to reject all documents that contain a duplicate value
	   Background:
	   TTL: expire data after a period of time.
	   ==================== */

	session, err := mongodb.FreeSession()
	if err != nil {
		return err
	}

	err = mongodb.Drop()
	if err != nil {
		fmt.Printf("\n drop database error: %v\n", err)
	}

	err = mongodb.UpsertDefaultUser()
	if err != nil {
		return err
	}

	defer session.Close()
	session.EnsureSafe(&mgo.Safe{})

	// ========== users

	collection := session.DB(mongo.Database).C("dviUsers")

	index := mgo.Index{
		Key:        []string{"name", "email", "description", "events", "groups"},
		Unique:     false,
		Background: true,
		Sparse:     true,
	}
	err = collection.EnsureIndex(index)
	if err != nil {
		return err
	}

	// ========== events

	collection = session.DB(mongo.Database).C("dviEvents")

	index = mgo.Index{
		Key:        []string{"name", "description", "users", "groups"},
		Unique:     false,
		Background: true,
		Sparse:     true,
	}
	err = collection.EnsureIndex(index)
	if err != nil {
		return err
	}

	index = mgo.Index{
		Key:         []string{"ttl"},
		ExpireAfter: time.Duration(1) * time.Second,
	}
	err = collection.EnsureIndex(index)
	if err != nil {
		return err
	}

	// ========== groups

	collection = session.DB(mongo.Database).C("dviGroups")

	index = mgo.Index{
		Key:        []string{"name", "description", "users", "events"},
		Unique:     false,
		Background: true,
		Sparse:     true,
	}
	err = collection.EnsureIndex(index)
	if err != nil {
		return err
	}

	// ========== points

	collection = session.DB(mongo.Database).C("dviPoints")

	index = mgo.Index{
		Key:        []string{"token"},
		Unique:     false,
		Background: true,
		Sparse:     true,
	}
	err = collection.EnsureIndex(index)
	if err != nil {
		return err
	}

	index = mgo.Index{
		Key:  []string{"$2dsphere:coordinates"},
		Bits: 26,
	}
	err = collection.EnsureIndex(index)
	if err != nil {
		return err
	}

	return nil
} // }}}

func (mongo *MongoDB) FillRnd(num int) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}
	defer session.Close()

	userRefs := new(UserRefs)
	userRef := &mgo.DBRef{}

	collection := session.DB(mongo.Database).C("dviUsers")
	for i := 0; i < num; i++ {
		user := new(User)
		user.SetRnd()
		err = collection.Insert(user)
		if err != nil {
			return err
		}
		userRef.Id = user.Id
		userRef.Collection = "dviUsers"
		*userRefs = append(*userRefs, *userRef)
	}

	collection = session.DB(mongo.Database).C("dviEvents")
	for i := 0; i < num; i++ {
		event := new(Event)
		event.SetRnd()
		event.Users = *userRefs

		// fmt.Printf("\nusers: %v\n", event.Users)
		err = collection.Insert(event)
		if err != nil {
			return err
		}
	}

	collection = session.DB(mongo.Database).C("dviPoints")
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

func (mongo *MongoDB) PostUser(user *User) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}

	defer session.Close()
	if _, err := mongodb.GetUserOnMail(user.Email); err == nil {
		return errors.New("User already exists!")
	}

	err := session.DB(mongo.Database).C("dviUsers").Insert(&user)
	return err
} // }}}

func (mongo *MongoDB) GetUserOnMail(Email string) (user User, err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return user, err
	}

	defer session.Close()
	err := session.DB(mongo.Database).C("dviUsers").Find(bson.M{"email": Email}).One(&user)
	return user, err
} // }}}

// ========== event

func (mongo *MongoDB) GetAllEvents() (events Events, err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return events, err
	}
	defer session.Close()

	err = session.DB(mongo.Database).C("dviEvents").Find(bson.M{}).All(&events)
	return events, err
} // }}}

func (mongo *MongoDB) PostEvent(event *Event) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}
	defer session.Close()

	collection := session.DB(mongo.Database).C("dviEvents").Insert(&event)
	return err
} // }}}

func (mongo *MongoDB) GetEvents() (events Events, err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return events, err
	}
	defer session.Close()

	err = session.DB(mongo.Database).C("dviEvents").Find(bson.M{}).All(&events)
	return events, err
} // }}}

// ========== group

// ========== point

func (mongo *MongoDB) GetAllPoints() (points GeoPoints, err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return points, err
	}
	defer session.Close()

	err = session.DB(mongo.Database).C("dviPoints").Find(bson.M{}).All(&points)
	return points, err
} // }}}

func (mongo *MongoDB) PostPoint(point *GeoPoint) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}
	defer session.Close()

	collection := session.DB(mongo.Database).C("dviPoints").Insert(&point)
	return err
} // }}}

// ========== geostate

func (mongo *MongoDB) InsertGeoState(geost *GeoState) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}

	defer session.Close()

	collection := session.DB(mongo.Database).C("dviPoints")
	for point := range geost.Points {
		err = collection.Insert(point)
	}

	return err
} // }}}
