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

func (mongodb *MongoDB) Init() (err error) { // {{{
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

	collection := session.DB(mongodb.config.Database).C("dviUsers")

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

	collection = session.DB(mongodb.config.Database).C("dviEvents")

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

	collection = session.DB(mongodb.config.Database).C("dviGroups")

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

	collection = session.DB(mongodb.config.Database).C("dviPoints")

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

func (mongodb *MongoDB) FillRnd(num int) (err error) { // {{{
	session, err := mongodb.Session()
	if err != nil {
		return err
	}
	defer session.Close()

	userRefs := new(UserRefs)
	userRef := &mgo.DBRef{}

	collection := session.DB(mongodb.config.Database).C("dviUsers")
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

	collection = session.DB(mongodb.config.Database).C("dviEvents")
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

func (mongodb *MongoDB) InsertUser(user *User) (err error) { // {{{
	session, err := mongodb.Session()
	if err != nil {
		return err
	}

	defer session.Close()
	if _, err := mongodb.GetUserOnMail(user.Email); err == nil {
		return fmt.Errorf("User already exists!")
	}

	collection := session.DB(mongodb.config.Database).C("dviUsers")
	err = collection.Insert(user)
	return err
} // }}}

func (mongodb *MongoDB) GetUserOnMail(Email string) (user User, err error) { // {{{
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

func (mongodb *MongoDB) GetAllEvents() (events Events, err error) { // {{{
	session, err := mongodb.Session()
	if err != nil {
		return events, err
	}

	defer session.Close()

	err = session.DB(mongodb.config.Database).C("dviEvents").Find(bson.M{}).All(&events)
	return events, err
} // }}}

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

// ========== group

// ========== point

func (mongodb *MongoDB) GetAllPoints() (points GeoPoints, err error) { // {{{
	session, err := mongodb.Session()
	if err != nil {
		return points, err
	}

	defer session.Close()

	err = session.DB(mongodb.config.Database).C("dviPoints").Find(bson.M{}).All(&points)
	return points, err
} // }}}

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

// ========== geostate

func (mongodb *MongoDB) InsertGeoState(geost *GeoState) (err error) { // {{{
	session, err := mongodb.Session()
	if err != nil {
		return err
	}

	defer session.Close()

	collection := session.DB(mongodb.config.Database).C("dviPoints")
	for point := range geost.Points {
		err = collection.Insert(point)
	}

	return err
} // }}}
