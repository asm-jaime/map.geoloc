package main

import (
	// "errors"
	"fmt"
	"os"
	"time"

	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"strings"
)

// ========== database init

type mongoDB struct {
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

func (mongo *mongoDB) setDefault() {
	mongo.Port = os.Getenv("MONGO_PORT")
	mongo.Host = os.Getenv("MONGO_HOST")
	mongo.Addrs = mongo.Host + ":" + mongo.Port
	mongo.Database = os.Getenv("MONGO_NAME")
	mongo.Username = os.Getenv("MONGO_USER")
	mongo.Password = os.Getenv("MONGO_PASSWORD")

	mongo.EventTTLAfterEnd = 1 * time.Second
	mongo.StdEventTTL = 20 * time.Minute

	mongo.Info = &mgo.DialInfo{
		Addrs:    []string{mongo.Addrs},
		Timeout:  2 * time.Hour,
		Database: mongo.Database,
		Username: mongo.Username,
		Password: mongo.Password,
	}
	err := mongo.setSession()
	if err != nil {
		panic("db connection does not exist")
	}
}

func (mongo *mongoDB) setSession() (err error) {
	mongo.Session, err = mgo.DialWithInfo(mongo.Info)
	if err != nil {
		mongo.Session, err = mgo.Dial(mongo.Host)
	}
	return err
}

func (mongo *mongoDB) drop() {
	session := mongo.Session.Clone()
	defer session.Close()
	session.DB(mongo.Database).C("dviUsers").DropCollection()
	session.DB(mongo.Database).C("dviEvents").DropCollection()
	session.DB(mongo.Database).C("dviLocations").DropCollection()
}

func (mongo *mongoDB) init() (err error) {
	mongo.drop()

	session := mongo.Session.Clone()
	defer session.Close()
	session.EnsureSafe(&mgo.Safe{})

	// ========== users
	collection := session.DB(mongo.Database).C("dviUsers")
	index := mgo.Index{
		Key:        []string{"name", "email", "text", "events"},
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
		Key:        []string{"name", "text", "users", "timestamp"},
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
		ExpireAfter: time.Duration(30) * time.Second,
	}
	err = collection.EnsureIndex(index)
	if err != nil {
		return err
	}

	// ========== locations
	collection = session.DB(mongo.Database).C("dviLocations")
	index = mgo.Index{
		Key:  []string{"$2dsphere:location"},
		Bits: 26,
	}
	err = collection.EnsureIndex(index)
	if err != nil {
		return err
	}

	return nil
}

// ========== user

func (mongo *mongoDB) getUsers() (users []geoUser, err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	err = session.DB(mongo.Database).C("dviUsers").Find(bson.M{}).All(&users)
	return users, err
}

func (mongo *mongoDB) getUser(u *geoUser) (gu geoUser, err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	if u.Email != "" {
		err = session.DB(mongo.Database).C("dviUsers").Find(bson.M{
			"email": u.Email,
		}).One(&gu)
	} else if u.ID.Hex() != "" {
		err = session.DB(mongo.Database).C("dviEvents").Find(bson.M{
			"_id": u.ID,
		}).One(&gu)
	}
	return gu, err
}

func (mongo *mongoDB) postUser(user *geoUser) (err error) {
	session := mongo.Session.Clone()

	defer session.Close()
	user.ID = bson.NewObjectId()

	err = session.DB(mongo.Database).C("dviUsers").Insert(&user)
	return err
}

func (mongo *mongoDB) updateUser(u *geoUser) (err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	err = session.DB(mongo.Database).C("dviUsers").
		Update(bson.M{"_id": u.ID}, &u)
	return err
}

func (mongo *mongoDB) delUser(u *geoUser) (err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	if u.ID.Hex() != "" {
		err = session.DB(mongo.Database).C("dviUsers").RemoveId(u.ID)
		return err
	}
	return err
}

// ========== event

func (mongo *mongoDB) getEvents() (events []geoEvent, err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	err = session.DB(mongo.Database).C("dviEvents").Find(bson.M{}).All(&events)
	return events, err
}

func (mongo *mongoDB) getEvent(event *geoEvent) (gevent geoEvent, err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	if event.ID.Hex() != "" {
		err = session.DB(mongo.Database).C("dviEvents").Find(bson.M{
			"_id": event.ID,
		}).One(&gevent)
	}
	return gevent, err
}

func (mongo *mongoDB) postEvents(events *[]geoEvent) (err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	for _, event := range *events {
		event.ID = bson.NewObjectId()
		err = session.DB(mongo.Database).C("dviEvents").Insert(&event)
	}
	return err
}

func (mongo *mongoDB) postEvent(event *geoEvent) (err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	event.ID = bson.NewObjectId()
	err = session.DB(mongo.Database).C("dviEvents").Insert(&event)
	return err
}

func (mongo *mongoDB) updateEvent(event *geoEvent) (err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	err = session.DB(mongo.Database).C("dviEvents").Update(
		bson.M{"_id": event.ID}, &event)
	return err
}

func (mongo *mongoDB) delEvent(event *geoEvent) (err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	if event.ID.Hex() != "" {
		err = session.DB(mongo.Database).C("dviEvents").RemoveId(event.ID)
	}
	return err
}

// ========== point

func (mongo *mongoDB) getLocs() (locs []geoLocation, err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	err = session.DB(mongo.Database).C("dviLocations").Find(bson.M{}).All(&locs)
	return locs, err
}

func (mongo *mongoDB) getLoc(point *geoLocation) (gpoint geoLocation, err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	if point.ID.Hex() != "" {
		err = session.DB(mongo.Database).C("dviLocations").Find(
			bson.M{"_id": point.ID},
		).One(&gpoint)
		return gpoint, err
	}
	return gpoint, err
}

func (mongo *mongoDB) postLoc(point *geoLocation) (gpoint *geoLocation, err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	point.ID = bson.NewObjectId()
	err = session.DB(mongo.Database).C("dviLocations").Insert(&point)
	return point, err
}

func (mongo *mongoDB) postLocs(locs *[]geoLocation) (err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	for _, point := range *locs {
		point.ID = bson.NewObjectId()
		err = session.DB(mongo.Database).C("dviLocations").Insert(&point)
	}
	return err
}

func (mongo *mongoDB) updateLoc(point *geoLocation) (err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	err = session.DB(mongo.Database).C("dviLocations").Update(
		bson.M{"_id": point.ID}, &point)
	return err
}

func (mongo *mongoDB) delLoc(point *geoLocation) (err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	if point.ID.Hex() != "" {
		fmt.Println(point.ID)
		err = session.DB(mongo.Database).C("dviLocations").RemoveId(point.ID)
	}
	return err
}

func (mongo *mongoDB) getNearLoc(near *reqNear) (locs []geoLocation, err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	err = session.DB(mongo.Database).C("dviLocations").Find(bson.M{
		"location": bson.M{
			"$nearSphere": bson.M{
				"$geometry": bson.M{
					"type":        near.TGeos,
					"coordinates": []float64{near.Lng, near.Lat},
				},
				"$maxDistance": near.Scope,
			},
		},
	}).All(&locs)

	return locs, err
}

// ========== geoloc+event

func (mongo *mongoDB) postGeoEvent(gv *reqGeoEvent) (res respondID, err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	res.ID = bson.NewObjectId()
	gv.Event.ID = res.ID
	gv.GeoLoc.ID = res.ID

	err = session.DB(mongo.Database).C("dviLocations").Insert(&gv.GeoLoc)
	err = session.DB(mongo.Database).C("dviEvents").Insert(&gv.Event)
	return res, err
}

func (mongo *mongoDB) getFiltered(filter *reqFilter) (elocs []eventLoc, err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	params := []bson.M{}

	if filter.Scope <= 0 {
		return elocs, err
	}

	params = append(params, bson.M{
		"$geoNear": bson.M{
			"spherical":     true,
			"near":          []float64{filter.Lng, filter.Lat},
			"distanceField": "distance",
			"includeLocs":   "location",
			"maxDistance":   filter.Scope,
		},
	})

	if filter.TObject != "" && filter.TObject != "Any" {
		params = append(params, bson.M{
			"$match": bson.M{
				"tobject": filter.TObject,
			},
		})
	}

	if filter.TObject == "Event" {
		params = append(params, bson.M{
			"$lookup": bson.M{
				"from":         "dviEvents",
				"localField":   "_id",
				"foreignField": "_id",
				"as":           "Events",
			},
		})
		params = append(params, bson.M{
			"$unwind": bson.M{
				"path":                       "$Events",
				"preserveNullAndEmptyArrays": true,
			},
		})
		if len(filter.Tags) > 0 && filter.Tags[0] != "" {
			filter.Tags = strings.Split(filter.Tags[0], ",")
			params = append(params, bson.M{
				"$match": bson.M{
					"Events.tags": bson.M{"$in": filter.Tags},
				},
			})
		}
		// Recently, Today, Yesterday, Week, Month
		if filter.TTime != "" && filter.TTime != "Any" {
			dateStart, dateEnd := wordToDate(filter.TTime)
			params = append(params, bson.M{
				"$match": bson.M{
					"Events.timestamp": bson.M{"$gt": dateStart, "$lt": dateEnd},
				},
			})
		}
		params = append(params, bson.M{
			"$project": bson.M{
				"_id":       1,
				"name":      "$Events.name",
				"tags":      "$Events.tags",
				"text":      "$Events.text",
				"timestamp": "$Events.timestamp",
				"tobject":   1,
				"location":  1,
			},
		})
	} else if filter.TObject == "User" {
		params = append(params, bson.M{
			"$lookup": bson.M{
				"from":         "dviUsers",
				"localField":   "_id",
				"foreignField": "_id",
				"as":           "Users",
			},
		})
		params = append(params, bson.M{
			"$unwind": bson.M{
				"path":                       "$Users",
				"preserveNullAndEmptyArrays": true,
			},
		})
		if len(filter.Tags) > 0 && filter.Tags[0] != "" {
			filter.Tags = strings.Split(filter.Tags[0], ",")
			params = append(params, bson.M{
				"$match": bson.M{
					"Users.tags": bson.M{"$in": filter.Tags},
				},
			})
		}
		params = append(params, bson.M{
			"$project": bson.M{
				"_id":       1,
				"name":      "$Users.name",
				"tags":      "$Users.tags",
				"text":      "$Users.text",
				"tobject":   1,
				"timestamp": 1,
				"location":  1,
			},
		})
	}

	err = session.DB(mongo.Database).C("dviLocations").Pipe(params).All(&elocs)
	return elocs, err
}

func wordToDate(ttime string) (dateStart time.Time, dateEnd time.Time) {
	today := time.Now()
	dateStart = time.Time{}
	dateEnd = today
	switch ttime {
	case "Recently":
		dateStart = today.Add(-4 * time.Hour)
		dateEnd = today
	case "Today":
		year, month, day := today.Date()
		dateStart = time.Date(year, month, day, 0, 0, 0, 0, today.Location())
		dateEnd = time.Date(year, month, day, 24, 0, 0, 0, today.Location())
	case "Yesterday":
		today = today.Add(-24 * time.Hour)
		year, month, day := today.Date()
		dateStart = time.Date(year, month, day, 0, 0, 0, 0, today.Location())
		dateEnd = time.Date(year, month, day, 24, 0, 0, 0, today.Location())
	case "Week":
		year, month, day := today.Date()
		dateStart = time.Date(year, month, day, 0, 0, 0, 0, today.Location())
		dateEnd = time.Date(year, month, day, 0, 0, 0, 0, today.Location())
		for dateStart.Weekday() != time.Monday {
			dateStart = dateStart.AddDate(0, 0, -1)
		}
		for dateEnd.Weekday() != time.Sunday {
			dateEnd = dateEnd.AddDate(0, 0, 1)
		}
		dateEnd = dateEnd.Add(24 * time.Hour)
	case "Month":
		year, month, _ := today.Date()
		dateStart = time.Date(year, month, 1, 0, 0, 0, 0, today.Location())
		dateEnd = time.Date(year, month, 32, 0, 0, 0, 0, today.Location())
		regMonth := dateEnd.Month()
		for dateEnd.Month() == regMonth {
			dateEnd = dateEnd.AddDate(0, 0, -1)
		}
		dateEnd = dateEnd.AddDate(0, 0, 1)
	}
	return dateStart, dateEnd
}
