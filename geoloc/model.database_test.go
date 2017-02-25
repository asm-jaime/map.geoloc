package geoloc

import (
	"fmt"
	"testing"
	"time"
)

func dbForTest() (database *MongoDB) { // {{{
	database = &MongoDB{}
	database.config.SetDefault()
	database.config.Database = "test"
	database.config.Info = database.config.MgoConfig()
	return database
} // }}}

func TestSession(testT *testing.T) { // {{{
	testdb := dbForTest()

	free_session, err := testdb.FreeSession()
	defer free_session.Close()
	fmt.Printf("\n free session: %v\n", free_session)
	if err != nil {
		testT.Error("error free session : ", err)
		return
	}

	session, err := testdb.Session()
	defer session.Close()
	fmt.Printf("\ndefault session: %v\n", session)
	if err != nil {
		testT.Error("error session : ", err)
	}
}

func TestInit(testT *testing.T) {
	testdb := dbForTest()
	err := testdb.Init()
	if err != nil {
		testT.Error("error Init : ", err)
	}

	err = testdb.FillRnd(10)
	if err != nil {
		testT.Error("error FillRnd: ", err)
	}

	points, err := testdb.GetAllPoints()
	if err != nil {
		testT.Error("error GetAllPoints: ", err)
	}
	if len(points) == 0 {
		testT.Error("error, points was not added")
	}
} // }}}

func TestFillRnd(testT *testing.T) { // {{{
	var points GeoPoints
	num := 10
	testdb := dbForTest()
	err := testdb.Init()
	if err != nil {
		testT.Error("error Init in FillRnd: ", err)
	}

	session, err := testdb.Session()
	if err != nil {
		testT.Error("error session : ", err)
	}
	defer session.Close()
	// make array of event
	start := time.Now()
	point := new(GeoPoint)
	for i := 0; i < num; i++ {
		point.SetRnd()
		points = append(points, *point)
	}
	elapsed := time.Since(start)
	fmt.Printf("\nelapsed make %v points: %v\n", num, elapsed)
	collection := session.DB(testdb.config.Database).C("dviPoints")

	// Normal insertion
	start = time.Now()
	for i := 0; i < len(points); i++ {
		err = collection.Insert(points[i])
	}
	elapsed = time.Since(start)
	fmt.Printf("\nelapsed Normal Insert: %v\n", elapsed)
	if err != nil {
		testT.Error("error Normal Insertion: ", err)
	}
	points_db, err := testdb.GetAllPoints()
	if err != nil {
		testT.Error("error GetAllPoints in FillRnd for MongoDB: ", err)
	}
	fmt.Printf("\n points from database: %v \n", points_db)
} // }}}

// // Bulk insertion// {{{
// start = time.Now()
// docs := make([]interface{}, len(events))
// for i := 0; i < len(events); i++ {
// docs[i] = events[i]
// }
// fmt.Printf("\n docs: %v \n", docs)
// collection.Bulk().Insert(docs...)
// res, err := collection.Bulk().Run()
// elapsed = time.Since(start)
// fmt.Printf("\nelapsed Bulk Insert: %v\n", elapsed)
// if err != nil {
// testT.Error("error FillRnd Insertion: ", err)
// }
// fmt.Printf("res: %v", res)// }}}
