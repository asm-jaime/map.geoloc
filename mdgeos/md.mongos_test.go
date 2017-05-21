package mdgeos

import (
	"fmt"
	"math/rand"
	"testing"
	"time"
)

func dbTest() (mg *MongoDB, err error) {
	mg = &MongoDB{}
	mg.SetDefault()
	mg.Database = "test"
	mg.Info = mg.MgoConfig()

	err = mg.SetSession()
	if err != nil {
		return mg, err
	}

	err = mg.Init()
	if err != nil {
		return mg, err
	}

	return mg, err
}

func dbProduct() *MongoDB {
	mg := &MongoDB{}
	mg.SetDefault()
	mg.Info = mg.MgoConfig()
	return mg
}

func _TestSession(t *testing.T) { // {{{
} // }}}

func _TestFillRnd(t *testing.T) { // {{{
	num := 10
	tdb, err := dbTest()
	if err != nil {
		t.Error("err connect db in FillRnd: ", err)
	}

	// Normal insertion
	start := time.Now()

	err = tdb.FillRnd(num)

	elapsed := time.Since(start)

	fmt.Printf("\nelapsed FillRnd: %v\n", elapsed)

	if err != nil {
		t.Error("error FillRnd: ", err)
	}

	locs, err := tdb.GetLocs()
	if err != nil || len(locs) == 0 {
		t.Error("error GetLocs in FillRnd: ", err)
	}
	// fmt.Printf("\n %v locs, one from db: %v \n", len(locs), locs[0])

	events, err := tdb.GetEvents()
	if err != nil || len(events) == 0 {
		t.Error("error GetEvents in FillRnd: ", err)
	}
	// fmt.Printf("\n %v events, one from db: %v \n", len(events), events[0])
} // }}}

func _TestLocation(t *testing.T) { // {{{
	tdb, err := dbTest()

	if err != nil {
		t.Error("err connect db in FillRnd: ", err)
	}

	// case get/post
	{
		point := GeoLocation{}
		point.SetRnd()

		_, err = tdb.PostLoc(&point)
		if err != nil {
			t.Error("error post Point: ", err)
		}
		spoint := GeoLocation{}
		spoint.Token = point.Token
		gpoint, err := tdb.GetLoc(&spoint)
		if err != nil {
			t.Error("error post Point: ", err)
		}
		if point.Id != gpoint.Id {
			t.Error("error get post point: ", err)
		}
	}

	// case post/update
	{
		point := GeoLocation{}
		point.SetRnd()
		_, err = tdb.PostLoc(&point)
		if err != nil {
			t.Error("err post 1: ", err)
		}
		// fmt.Printf("\npoint %v posted\n", point.Token)

		spoint := GeoLocation{}
		spoint.SetRnd()
		spoint.Id = point.Id
		err = tdb.UpdateLoc(&spoint)
		if err != nil {
			t.Error("err update: ", err)
		}
		fmt.Printf("\nspoint %v updated\n", spoint)

		gpoint, err := tdb.GetLoc(&spoint)
		if err != nil {
			t.Error("err get: ", err)
		}
		if point.Id == gpoint.Id && point.Token == gpoint.Token {
			t.Error("err locs do not updated: ", err)
		}
	}
} // }}}

func _TestNearLoc(t *testing.T) { // {{{
	num := 100
	tdb, err := dbTest()
	if err != nil {
		t.Error("err connect db in FillRnd: ", err)
	}
	err = tdb.FillRnd(num)
	if err != nil {
		t.Error("err Fill: ", err)
	}

	req := ReqNear{}
	req.Scope = 5000000
	req.TypeGeo = "Point"
	//latitude in degrees is -90 and +90
	req.Lat = (rand.Float64() * 180) - 90
	//Longitude is in the range -180 and +180
	req.Lng = (rand.Float64() * 360) - 180

	locs, err := tdb.GetNearLoc(&req)

	fmt.Printf("\nlocs: %v\n", locs)
} // }}}

func TestFilteredLoc(t *testing.T) {
	num := 100
	tdb, err := dbTest()
	if err != nil {
		t.Error("err connect db in FillRnd: ", err)
	}
	err = tdb.FillRnd(num)
	if err != nil {
		t.Error("err Fill: ", err)
	}

	req := ReqFilter{}
	req.Scope = 5000000
	req.TypeGeo = "Point"
	req.TypeObject = "User"
	//latitude in degrees is -90 and +90
	req.Lat = (rand.Float64() * 180) - 90
	//Longitude is in the range -180 and +180
	req.Lng = (rand.Float64() * 360) - 180
	//req.TypeTime

	locs, err := tdb.GetFilteredLoc(&req)

	fmt.Printf("\nlocs: %v\n", locs)

}
