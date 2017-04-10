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
	Session          *mgo.Session
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

// SetSession set a new session
func (mongo *MongoDB) SetSession() (err error) {
	mongo.Session, err = mgo.DialWithInfo(mongo.Info)
	if err != nil {
		mongo.Session, err = mgo.Dial(mongo.Host)
		if err != nil {
			return err
		}
	}
	return err
}

// ========== database init

func (mongo *MongoDB) UpsertDefaultUser() (err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

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
	session := mongo.Session.Clone()
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

	err = mongo.Drop()
	if err != nil {
		fmt.Printf("\n drop database error: %v\n", err)
	}

	err = mongo.UpsertDefaultUser()
	if err != nil {
		return err
	}

	session := mongo.Session.Clone()
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

	// ========== Locs
	collection = session.DB(mongo.Database).C("dviLocations")
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
		Key:  []string{"$2dsphere:location"},
		Bits: 26,
	}
	err = collection.EnsureIndex(index)
	if err != nil {
		return err
	}

	return nil
} // }}}

func (mongo *MongoDB) FillRnd(num int) (err error) { // {{{
	session := mongo.Session.Clone()
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

	point := GeoLocation{}
	for i := 0; i < num; i++ {
		point.SetRnd()
		err = session.DB(mongo.Database).C("dviLocations").Insert(&point)
		if err != nil {
			return err
		}
	}

	return err
} // }}}

// ========== user

func (mongo *MongoDB) GetUsers() (users []User, err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	err = session.DB(mongo.Database).C("dviUsers").Find(bson.M{}).All(&users)
	return users, err
} // }}}

func (mongo *MongoDB) GetUser(user *User) (guser User, err error) { // {{{
	session := mongo.Session.Clone()
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
	session := mongo.Session.Clone()

	defer session.Close()
	if _, err := mongo.GetUser(user); err == nil {
		return errors.New("User already exists!")
	}

	err = session.DB(mongo.Database).C("dviUsers").Insert(&user)
	return err
} // }}}

func (mongo *MongoDB) UpdateUser(user *User) (err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	err = session.DB(mongo.Database).C("dviUsers").Update(
		bson.M{"_id": user.Id}, &user)
	return err
} // }}}

func (mongo *MongoDB) DelUser(user *User) (err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	if user.Id.Hex() != "" {
		err = session.DB(mongo.Database).C("dviUsers").RemoveId(user.Id)
		return err
	}
	return err
} // }}}

// ========== event

func (mongo *MongoDB) GetEvents() (events []Event, err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	err = session.DB(mongo.Database).C("dviEvents").Find(bson.M{}).All(&events)
	return events, err
} // }}}

func (mongo *MongoDB) GetEvent(event *Event) (gevent Event, err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	if event.Id.Hex() != "" {
		err = session.DB(mongo.Database).C("dviEvents").Find(bson.M{"_id": event.Id}).One(&gevent)
		return gevent, err
	}
	return gevent, err
} // }}}

func (mongo *MongoDB) PostEvents(events *[]Event) (err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	for _, event := range *events {
		event.Id = bson.NewObjectId()
		err = session.DB(mongo.Database).C("dviEvents").Insert(&event)
	}
	return err
} // }}}

func (mongo *MongoDB) PostEvent(event *Event) (err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	event.Id = bson.NewObjectId()
	err = session.DB(mongo.Database).C("dviEvents").Insert(&event)
	return err
} // }}}

func (mongo *MongoDB) UpdateEvent(event *Event) (err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	err = session.DB(mongo.Database).C("dviLocations").Update(
		bson.M{"_id": event.Id}, &event)
	return err
} // }}}

func (mongo *MongoDB) DelEvent(event *Event) (err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	if event.Id.Hex() != "" {
		err = session.DB(mongo.Database).C("dviEvents").RemoveId(event.Id)
		return err
	}
	return err
} // }}}

// ========== group

func (mongo *MongoDB) GetGroups() (groups []Group, err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	err = session.DB(mongo.Database).C("dviGroups").Find(bson.M{}).All(&groups)
	return groups, err
} // }}}

func (mongo *MongoDB) GetGroup(group *Group) (ggroup Group, err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	if group.Id.Hex() != "" {
		err = session.DB(mongo.Database).C("dviGroups").Find(bson.M{"_id": group.Id}).One(&ggroup)
		return ggroup, err
	}
	return ggroup, err
} // }}}

func (mongo *MongoDB) PostGroups(groups *[]Group) (err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	for _, group := range *groups {
		group.Id = bson.NewObjectId()
		err = session.DB(mongo.Database).C("dviGroups").Insert(&group)
	}
	return err
} // }}}

func (mongo *MongoDB) PostGroup(group *Group) (err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	group.Id = bson.NewObjectId()
	err = session.DB(mongo.Database).C("dviGroups").Insert(&group)
	return err
} // }}}

func (mongo *MongoDB) UpdateGroup(group *Group) (err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	err = session.DB(mongo.Database).C("dviLocations").Update(
		bson.M{"_id": group.Id}, &group)
	return err
} // }}}

func (mongo *MongoDB) DelGroup(group *Group) (err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	if group.Id.Hex() != "" {
		err = session.DB(mongo.Database).C("dviGroups").RemoveId(group.Id)
		return err
	}
	return err
} // }}}

// ========== point

func (mongo *MongoDB) GetLocs() (locs []GeoLocation, err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	err = session.DB(mongo.Database).C("dviLocations").Find(bson.M{}).All(&locs)
	return locs, err
} // }}}

func (mongo *MongoDB) GetLoc(point *GeoLocation) (gpoint GeoLocation, err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	if point.Token != "" {
		err = session.DB(mongo.Database).C("dviLocations").Find(bson.M{"token": point.Token}).One(&gpoint)
		return gpoint, err
	}

	if point.Id.Hex() != "" {
		err = session.DB(mongo.Database).C("dviLocations").Find(bson.M{"_id": point.Id}).One(&gpoint)
		return gpoint, err
	}
	return gpoint, err
} // }}}

func (mongo *MongoDB) PostLoc(point *GeoLocation) (gpoint *GeoLocation, err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	point.Id = bson.NewObjectId()
	err = session.DB(mongo.Database).C("dviLocations").Insert(&point)
	return point, err
} // }}}

func (mongo *MongoDB) PostLocs(locs *[]GeoLocation) (err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	for _, point := range *locs {
		point.Id = bson.NewObjectId()
		err = session.DB(mongo.Database).C("dviLocations").Insert(&point)
	}
	return err
} // }}}

func (mongo *MongoDB) UpdateLoc(point *GeoLocation) (err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	err = session.DB(mongo.Database).C("dviLocations").Update(
		bson.M{"_id": point.Id}, &point)
	return err
} // }}}

func (mongo *MongoDB) DelLoc(point *GeoLocation) (err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	if point.Id.Hex() != "" {
		err = session.DB(mongo.Database).C("dviLocations").RemoveId(point.Id)
		return err
	}

	if point.Token != "" {
		err = session.DB(mongo.Database).C("dviLocations").Remove(bson.M{
			"token": point.Token,
		})
	}
	return err
} // }}}

func (mongo *MongoDB) GetNearLoc(point *GeoLocation, scope int) (locs []GeoLocation, err error) {
	// fmt.Printf("\nloc: %v\n, dist: %v\n", point, scope)
	session := mongo.Session.Clone()
	defer session.Close()

	err = session.DB(mongo.Database).C("dviLocations").Find(bson.M{
		"location": bson.M{
			"$nearSphere": bson.M{
				"$geometry": bson.M{
					"type":        point.Location.Type,
					"coordinates": []float64{point.Location.Coordinates[0], point.Location.Coordinates[1]},
				},
				"$maxDistance": scope,
			},
		},
	}).All(&locs)

	return locs, err
}

// ========== geostate

func (mongo *MongoDB) UpdateGeoState(geost *GeoState) (err error) { // {{{
	session := mongo.Session.Clone()
	defer session.Close()

	for _, point := range geost.Locations {
		err = session.DB(mongo.Database).C("dviLocations").Update(
			bson.M{"_id": point.Id}, &point)
	}

	return err
} // }}}
