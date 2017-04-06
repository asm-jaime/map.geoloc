package mdgeos

import (
	"fmt"
	"testing"
	"time"
)

func dbTest() *MongoDB {
	mg := &MongoDB{}
	mg.SetDefault()
	mg.Database = "test"
	mg.Info = mg.MgoConfig()
	return mg
}

func dbProduct() *MongoDB {
	mg := &MongoDB{}
	mg.SetDefault()
	mg.Info = mg.MgoConfig()
	return mg
}

func _TestSession(t *testing.T) { // {{{
	mongo := dbTest()
	err := mongo.SetSession()
	// fmt.Printf("\n free session: %v\n", mongo.Session)
	if err != nil {
		t.Error("error free session: ", err)
		return
	}
} // }}}

func _TestInit(t *testing.T) { // {{{
	tdb := dbTest()
	err := tdb.Init()
	if err != nil {
		t.Error("error Init : ", err)
	}

	err = tdb.FillRnd(10)
	if err != nil {
		t.Error("error FillRnd: ", err)
	}

	points, err := tdb.GetPoints()
	if err != nil {
		t.Error("error GetAllPoints: ", err)
	}
	if len(points) == 0 {
		t.Error("error, points was not added")
	}
} // }}}

func _TestFillRnd(t *testing.T) { // {{{
	num := 10

	tdb := dbTest()
	err := tdb.Init()
	if err != nil {
		t.Error("error Init in FillRnd: ", err)
	}

	// Normal insertion
	start := time.Now()

	err = tdb.FillRnd(num)

	elapsed := time.Since(start)
	fmt.Printf("\nelapsed FillRnd: %v\n", elapsed)
	if err != nil {
		t.Error("error FillRnd: ", err)
	}

	points, err := tdb.GetPoints()
	if err != nil || len(points) == 0 {
		t.Error("error GetAllPoints in FillRnd: ", err)
	}
	fmt.Printf("\n %v points, one from db: %v \n", len(points), points[0])

	events, err := tdb.GetEvents()
	if err != nil || len(events) == 0 {
		t.Error("error GetAllEvents in FillRnd: ", err)
	}
	fmt.Printf("\n %v events, one from db: %v \n", len(events), events[0])
} // }}}

func TestPoint(t *testing.T) {
	tdb := dbTest()
	err := tdb.SetSession()
	if err != nil {
		t.Error("error set session: ", err)
	}

	err = tdb.Init()
	if err != nil {
		t.Error("error post Point: ", err)
	}

	// case get/post
	{
		point := GeoPoint{}
		point.SetRnd()

		err = tdb.PostPoint(&point)
		if err != nil {
			t.Error("error post Point: ", err)
		}
		spoint := GeoPoint{}
		spoint.Token = point.Token
		gpoint, err := tdb.GetPoint(&spoint)
		if err != nil {
			t.Error("error post Point: ", err)
		}
		if point.Id != gpoint.Id {
			t.Error("error get post point: ", err)
		}
	}
	// case post/update
	{
		point := GeoPoint{}
		point.SetRnd()
		err = tdb.PostPoint(&point)
		if err != nil {
			t.Error("err post 1: ", err)
		}
		// fmt.Printf("\npoint %v posted\n", point.Token)

		spoint := GeoPoint{}
		spoint.SetRnd()
		spoint.Id = point.Id
		err = tdb.UpdatePoint(&spoint)
		if err != nil {
			t.Error("err update: ", err)
		}
		// fmt.Printf("\nspoint %v updated\n", spoint.Token)

		gpoint, err := tdb.GetPoint(&spoint)
		if err != nil {
			t.Error("err get: ", err)
		}
		if point.Id == gpoint.Id && point.Token == gpoint.Token {
			t.Error("err points do not updated: ", err)
		}
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
// t.Error("error FillRnd Insertion: ", err)
// }
// fmt.Printf("res: %v", res)// }}}
