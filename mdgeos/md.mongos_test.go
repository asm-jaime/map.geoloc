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

func _TestSession(testT *testing.T) { // {{{
	fmt.Print("\n== start TestSession ==\n")
	testdb := dbForTest()

	free_session, err := testdb.FreeSession()
	defer free_session.Close()
	fmt.Printf("\n free session: %v\n", free_session)
	if err != nil {
		testT.Error("error free session: ", err)
		return
	}

	err = testdb.Init()
	if err != nil {
		testT.Error("error Init: ", err)
		return
	}

	session, err := testdb.Session()
	defer session.Close()
	fmt.Printf("\ndefault session: %v\n", session)
	if err != nil {
		testT.Error("error session: ", err)
	}
	fmt.Print("\n== end TestSession ==\n")
} // }}}

func _TestInit(testT *testing.T) { // {{{
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

func _TestFillRnd(testT *testing.T) { // {{{
	num := 10

	testdb := dbForTest()
	err := testdb.Init()
	if err != nil {
		testT.Error("error Init in FillRnd: ", err)
	}

	// Normal insertion
	start := time.Now()

	err = testdb.FillRnd(num)

	elapsed := time.Since(start)
	fmt.Printf("\nelapsed FillRnd: %v\n", elapsed)
	if err != nil {
		testT.Error("error FillRnd: ", err)
	}

	points, err := testdb.GetAllPoints()
	if err != nil || len(points) == 0 {
		testT.Error("error GetAllPoints in FillRnd: ", err)
	}
	fmt.Printf("\n %v points, one from db: %v \n", len(points), points[0])

	events, err := testdb.GetAllEvents()
	if err != nil || len(events) == 0 {
		testT.Error("error GetAllEvents in FillRnd: ", err)
	}
	fmt.Printf("\n %v events, one from db: %v \n", len(events), events[0])
} // }}}

func TestInsertPoint(testT *testing.T) {
	testdb := dbForTest()
	err := testdb.Init()
	if err != nil {
		testT.Error("error InsertPoint: ", err)
	}
	user := new(User)
	user.SetRnd()

	point := new(GeoPoint)
	point.SetRnd()

	err = testdb.InsertPoint(point)
	if err != nil {
		testT.Error("error InsertPoint: ", err)
	}
}

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
