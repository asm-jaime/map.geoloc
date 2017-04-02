package mdgeos

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

// MgoConfig return all data of config for connect to mongoDB {{{
func (mongo *MongoDB) MgoConfig() *mgo.DialInfo {
	info := &mgo.DialInfo{
		Addrs:    []string{mongo.Addrs},
		Timeout:  60 * time.Second,
		Database: mongo.Database,
		Username: mongo.Username,
		Password: mongo.Password,
	}
	return info
}

// }}}

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

func (mongo *MongoDB) UpsertDefaultUser() (err error) { // {{{
	session, err := mongo.FreeSession()
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

	session, err := mongo.FreeSession()
	if err != nil {
		return err
	}

	err = mongo.Drop()
	if err != nil {
		fmt.Printf("\n drop database error: %v\n", err)
	}

	err = mongo.UpsertDefaultUser()
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

	userRefs := new([]mgo.DBRef)
	userRef := &mgo.DBRef{}
	user := User{}
	for i := 0; i < num; i++ {
		user.SetRnd()
		userRef.Id = user.Id
		userRef.Collection = "dviUsers"
		*userRefs = append(*userRefs, *userRef)
		err = session.DB(mongo.Database).C("dviUsers").Insert(&user)
		if err != nil {
			return err
		}
	}

	event := Event{}
	for i := 0; i < num; i++ {
		event.SetRnd()
		event.Users = *userRefs
		err = session.DB(mongo.Database).C("dviEvents").Insert(&event)
		if err != nil {
			return err
		}
	}

	point := GeoPoint{}
	for i := 0; i < num; i++ {
		point.SetRnd()
		err = session.DB(mongo.Database).C("dviPoints").Insert(&point)
		if err != nil {
			return err
		}
	}

	return err
} // }}}

// ========== user

func (mongo *MongoDB) GetUsers() (users []User, err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return users, err
	}
	defer session.Close()

	err = session.DB(mongo.Database).C("dviUsers").Find(bson.M{}).All(&users)
	return users, err
} // }}}

func (mongo *MongoDB) GetUser(user *User) (guser User, err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return guser, err
	}
	defer session.Close()

	if user.Email != "" {
		err = session.DB(mongo.Database).C("dviUsers").Find(bson.M{"email": user.Email}).One(&user)
		return guser, err
	}
	if user.Id.Hex() != "" {
		err = session.DB(mongo.Database).C("dviEvents").Find(bson.M{"_id": user.Id}).One(&guser)
		return guser, err
	}
	return guser, err
} // }}}

func (mongo *MongoDB) PostUser(user *User) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}

	defer session.Close()
	if _, err := mongo.GetUserOnMail(user.Email); err == nil {
		return errors.New("User already exists!")
	}

	err = session.DB(mongo.Database).C("dviUsers").Insert(&user)
	return err
} // }}}

func (mongo *MongoDB) DelUser(user *User) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}
	defer session.Close()

	if user.Id.Hex() != "" {
		err = session.DB(mongo.Database).C("dviUsers").RemoveId(user.Id)
		return err
	}
	return err
} // }}}

func (mongo *MongoDB) UpdateUser(user *User) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}
	defer session.Close()

	err = session.DB(mongo.Database).C("dviUsers").Update(
		bson.M{"_id": user.Id}, &user)
	return err
} // }}}

// ========== event

func (mongo *MongoDB) GetEvents() (events []Event, err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return events, err
	}
	defer session.Close()

	err = session.DB(mongo.Database).C("dviEvents").Find(bson.M{}).All(&events)
	return events, err
} // }}}

func (mongo *MongoDB) GetEvent(event *Event) (gevent Event, err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return gevent, err
	}
	defer session.Close()

	if event.Id.Hex() != "" {
		err = session.DB(mongo.Database).C("dviEvents").Find(bson.M{"_id": event.Id}).One(&gevent)
		return gevent, err
	}
	return gevent, err
} // }}}

func (mongo *MongoDB) PostEvents(events *[]Event) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}
	defer session.Close()
	for _, event := range *events {
		err = session.DB(mongo.Database).C("dviEvents").Insert(&event)
	}
	return err
} // }}}

func (mongo *MongoDB) PostEvent(event *Event) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}
	defer session.Close()

	err = session.DB(mongo.Database).C("dviEvents").Insert(&event)
	return err
} // }}}

func (mongo *MongoDB) DelEvent(event *Event) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}
	defer session.Close()

	if event.Id.Hex() != "" {
		err = session.DB(mongo.Database).C("dviEvents").RemoveId(event.Id)
		return err
	}
	return err
} // }}}

func (mongo *MongoDB) UpdateEvent(event *Event) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}
	defer session.Close()

	err = session.DB(mongo.Database).C("dviPoints").Update(
		bson.M{"_id": event.Id}, &event)
	return err
} // }}}

// ========== group

func (mongo *MongoDB) GetGroups() (groups []Group, err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return groups, err
	}
	defer session.Close()

	err = session.DB(mongo.Database).C("dviGroups").Find(bson.M{}).All(&groups)
	return groups, err
} // }}}

func (mongo *MongoDB) GetGroup(group *Group) (ggroup Group, err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return ggroup, err
	}
	defer session.Close()

	if group.Id.Hex() != "" {
		err = session.DB(mongo.Database).C("dviGroups").Find(bson.M{"_id": group.Id}).One(&ggroup)
		return ggroup, err
	}
	return ggroup, err
} // }}}

func (mongo *MongoDB) PostGroups(groups *[]Group) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}
	defer session.Close()
	for _, group := range *groups {
		err = session.DB(mongo.Database).C("dviGroups").Insert(&group)
	}
	return err
} // }}}

func (mongo *MongoDB) PostGroup(group *Group) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}
	defer session.Close()

	err = session.DB(mongo.Database).C("dviGroups").Insert(&group)
	return err
} // }}}

func (mongo *MongoDB) DelGroup(group *Group) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}
	defer session.Close()

	if group.Id.Hex() != "" {
		err = session.DB(mongo.Database).C("dviGroups").RemoveId(group.Id)
		return err
	}
	return err
} // }}}

func (mongo *MongoDB) UpdateGroup(group *Group) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}
	defer session.Close()

	err = session.DB(mongo.Database).C("dviPoints").Update(
		bson.M{"_id": group.Id}, &group)
	return err
} // }}}

// ========== point

func (mongo *MongoDB) GetPoints() (points []GeoPoint, err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return points, err
	}
	defer session.Close()

	err = session.DB(mongo.Database).C("dviPoints").Find(bson.M{}).All(&points)
	return points, err
} // }}}

func (mongo *MongoDB) GetPoint(point *GeoPoint) (gpoint GeoPoint, err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return gpoint, err
	}
	defer session.Close()

	if point.Token != "" {
		err = session.DB(mongo.Database).C("dviPoints").Find(bson.M{"token": point.Token}).One(&gpoint)
		return gpoint, err
	}

	if point.Id.Hex() != "" {
		err = session.DB(mongo.Database).C("dviPoints").Find(bson.M{"_id": point.Id}).One(&gpoint)
		return gpoint, err
	}
	return gpoint, err
} // }}}

func (mongo *MongoDB) PostPoint(point *GeoPoint) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}
	defer session.Close()

	err = session.DB(mongo.Database).C("dviPoints").Insert(&point)
	return err
} // }}}

func (mongo *MongoDB) PostPoints(points *[]GeoPoint) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}
	defer session.Close()
	for _, point := range *points {
		err = session.DB(mongo.Database).C("dviPoints").Insert(&point)
	}
	return err
} // }}}

func (mongo *MongoDB) DelPoint(point *GeoPoint) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}
	defer session.Close()

	if point.Id.Hex() != "" {
		err = session.DB(mongo.Database).C("dviPoints").RemoveId(point.Id)
		return err
	}

	if point.Token != "" {
		err = session.DB(mongo.Database).C("dviPoints").Remove(bson.M{
			"token": point.Token,
		})
	}
	return err
} // }}}

func (mongo *MongoDB) UpdatePoint(point *GeoPoint) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}
	defer session.Close()

	err = session.DB(mongo.Database).C("dviPoints").Update(
		bson.M{"_id": point.Id}, &point)
	return err
} // }}}

// ========== geostate

func (mongo *MongoDB) InsertGeoState(geost *GeoState) (err error) { // {{{
	session, err := mongo.Session()
	if err != nil {
		return err
	}
	defer session.Close()

	for _, point := range geost.Points {
		err = session.DB(mongo.Database).C("dviPoints").Insert(&point)
	}

	return err
} // }}}
