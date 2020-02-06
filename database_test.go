package main

import (
	gen "github.com/asm-jaime/gen"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"log"
	"math/rand"
	"os"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func userRnd() (u geoUser) {
	u.ID = bson.NewObjectId()
	u.Name = "jhon " + gen.Str(4)
	u.Email = gen.Str(6) + "@" + gen.Str(4) + "." + gen.Str(2)
	u.Text = "descr: " + gen.Str(10)
	u.Tags = []string{[]string{"whoredom", "debauch", "drugs"}[rand.Intn(3)]}
	return u
}

func pointRnd() (loc geoLocation) {
	loc.ID = bson.NewObjectId()
	loc.TObject = []string{"User", "Event"}[rand.Intn(2)]
	loc.Location.Type = []string{"Point"}[0]
	//latitude in degrees is -90 and +90
	loc.Location.Coordinates[1] = (rand.Float64() * 180) - 90
	//longitude is in the range -180 and +180
	loc.Location.Coordinates[0] = (rand.Float64() * 360) - 180
	return loc
}

func eventRnd() (e geoEvent) {
	e.ID = bson.NewObjectId()
	e.Name = "event: " + string(e.ID)
	e.Text = "descr: " + gen.Str(10)
	e.Tags = []string{[]string{"whoredom", "debauch", "drugs"}[rand.Intn(3)]}
	e.Timestamp = time.Now().Add(-time.Duration(rand.Intn(100)) * time.Hour)
	return e
}

func fillRndToDB(mongo *mongoDB, num int) (err error) {
	rand.New(rand.NewSource(time.Now().UnixNano()))

	session := mongo.Session.Clone()
	defer session.Close()
	userRefs := new([]mgo.DBRef)
	userRef := &mgo.DBRef{}

	limitOnReferences := 2
	for i := 0; i < num; i++ {
		user := userRnd()
		point := pointRnd()
		userRef.Id = user.ID
		point.ID = user.ID
		point.TObject = "User"
		if i < limitOnReferences {
			userRef.Collection = "dviUsers"
			*userRefs = append(*userRefs, *userRef)
		}
		err = session.DB(mongo.Database).C("dviUsers").Insert(&user)
		err = session.DB(mongo.Database).C("dviLocations").Insert(&point)
		if err != nil {
			return err
		}
	}

	for i := 0; i < num; i++ {
		event := eventRnd()
		point := pointRnd()
		point.ID = event.ID
		point.TObject = "Event"
		event.Users = *userRefs
		err = session.DB(mongo.Database).C("dviEvents").Insert(&event)
		err = session.DB(mongo.Database).C("dviLocations").Insert(&point)
		if err != nil {
			return err
		}
	}
	return err
}

func dbTest() (mongo *mongoDB, err error) {
	os.Setenv("MONGO_NAME", "test")
	os.Setenv("MONGO_USER", "jaime")
	os.Setenv("MONGO_PASSWORD", "123456789")
	os.Setenv("MONGO_HOST", "localhost")
	os.Setenv("MONGO_PORT", "27017")
	mongo = &mongoDB{}
	mongo.setDefault()

	err = mongo.init()
	return mongo, err
}

func TestMongoDB(t *testing.T) {
	db, err := dbTest()
	if err != nil {
		t.Error("db err: ", err)
	}
	fillRndToDB(db, 100)

	// locations
	{
		locs, err := db.getLocs()
		if err != nil || len(locs) == 0 {
			t.Error("error getLocs: ", err)
		}
	}
	// events
	{
		events, err := db.getEvents()
		if err != nil || len(events) == 0 {
			t.Error("error getEvents: ", err)
		}
	}
}

func TestLocation(t *testing.T) {
	db, err := dbTest()
	if err != nil {
		t.Error("err db: ", err)
	}

	// case post/update/get
	{
		point := pointRnd()
		_, err = db.postLoc(&point)
		if err != nil {
			t.Error("err postLoc: ", err)
		}
		pointSec := pointRnd()
		pointSec.ID = point.ID
		err = db.updateLoc(&pointSec)
		if err != nil {
			t.Error("err updateLoc: ", err)
		}
		pointCheck, err := db.getLoc(&pointSec)
		if err != nil {
			t.Error("err getLoc: ", err)
		}
		assert.NotEqual(t, point, pointCheck, "point should be updated")
	}
}

func TestNearLoc(t *testing.T) {
	db, err := dbTest()
	if err != nil {
		t.Error("db err: ", err)
	}
	fillRndToDB(db, 100)
	{
		req := reqNear{}
		req.Scope = 10000000
		req.TGeos = "Point"
		req.Lat = (rand.Float64() * 180) - 90
		req.Lng = (rand.Float64() * 360) - 180
		locs, err := db.getNearLoc(&req)
		if err != nil {
			t.Error("err getNearLoc: ", err)
		}
		if len(locs) < 1 {
			t.Error("err, no points nearby at request")
		}
	}
}

func TestGeoEvent(t *testing.T) {
	db, err := dbTest()
	if err != nil {
		t.Error("db err: ", err)
	}
	fillRndToDB(db, 100)

	// case post/get
	{
		loc := pointRnd()
		event := eventRnd()
		gv := reqGeoEvent{Event: event, GeoLoc: loc}
		id, err := db.postGeoEvent(&gv)
		if err != nil {
			t.Error("err postGeoEvent: ", err)
		}

		loc.ID = id.ID
		gloc, err := db.getLoc(&loc)
		if err != nil {
			t.Error("err get: ", err)
		}
		assert.Equal(t, loc.ID.Hex(), gloc.ID.Hex(), "id does not match")
	}
}

func TestFilterEventLoc(t *testing.T) {
	db, err := dbTest()
	if err != nil {
		t.Error("db err: ", err)
	}
	fillRndToDB(db, 500)

	// case user today
	{
		req := reqFilter{}
		req.TObject = "Event"
		req.Scope = 3.1
		req.TTime = "Today"
		req.Lat = 11
		req.Lng = 8
		log.Println(req)
		elocs, err := db.getFiltered(&req)
		if err != nil || len(elocs) == 0 {
			t.Error("err getFiltered: ", err)
			return
		}
		log.Println(elocs[0])
		assert.Equal(t, time.Now().Day(), elocs[0].Timestamp.Day(), "day does not match")
	}
}
