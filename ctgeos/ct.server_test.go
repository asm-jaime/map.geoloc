package ctgeos

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"sync"
	"testing"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"

	"dvij.geoloc/conf"
	md "dvij.geoloc/mdgeos"
)

func dbTest() (vars *Vars, mg *md.MongoDB, coauth *oauth2.Config, err error) { // {{{
	mg = &md.MongoDB{}
	mg.SetDefault()
	mg.Database = "test"
	mg.Info = mg.MgoConfig()

	err = mg.SetSession()
	if err != nil {
		return vars, mg, coauth, err
	}

	err = mg.Init()
	if err != nil {
		return vars, mg, coauth, err
	}

	// err = mg.FillRnd(1)
	// if err != nil {
	// return vars, mg, coauth, err
	// }

	vars = &Vars{geoState: *md.NewGeoState()}
	config := conf.ServerConfig{}
	config.SetDefault()

	coauth = &oauth2.Config{
		ClientID:     config.Cred.Cid,
		ClientSecret: config.Cred.Csecret,
		RedirectURL:  "http://" + config.Host + ":" + config.Port + "/auth",
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
		},
		Endpoint: google.Endpoint,
	}

	return vars, mg, coauth, err
} // }}}

func dbProduct() *md.MongoDB { // {{{
	mg := &md.MongoDB{}
	mg.SetDefault()
	mg.Info = mg.MgoConfig()
	return mg
} // }}}

func _TestGetRndLoc(t *testing.T) { // {{{
	vars, tmongo, coauth, err := dbTest()
	if err != nil {
		t.Error("err db: ", err)
	}

	// fmt.Println("start router")
	testRouter := SetupRouter(vars, tmongo, coauth)

	// start make requests
	getRndPoint, err := http.NewRequest("GET", "/api/v1/rndpoints/", nil)

	type Res struct {
		Msg  string         `json:"msg"`
		Body md.GeoLocation `json:"body"`
	}

	res := Res{}
	empty_point := md.GeoLocation{}

	wg := &sync.WaitGroup{}
	for count := 0; count < 2; count++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			response := httptest.NewRecorder()
			testRouter.ServeHTTP(response, getRndPoint)
			err = json.Unmarshal(response.Body.Bytes(), &res)
			if res.Body == empty_point {
				t.Error("error, empty put point")
			}
		}()
	}
	if err != nil {
		t.Errorf("error put point: %v", err)
	}
	wg.Wait()
} // }}}

func _TestLocation(t *testing.T) { // {{{
	num_request := 6

	vars, tmongo, coauth, err := dbTest()
	if err != nil {
		t.Error("err db: ", err)
	}

	testRouter := SetupRouter(vars, tmongo, coauth)

	// start make requests

	point := md.GeoLocation{}
	wg := &sync.WaitGroup{}
	for count := 0; count < num_request; count++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			point.SetRnd()
			jpoint, _ := json.Marshal(point)
			PostLoc, _ := http.NewRequest("POST", "/api/v1/points/", bytes.NewBuffer(jpoint))
			PostLoc.Header.Set("X-Custom-Header", "myvalue")
			PostLoc.Header.Set("Content-Type", "application/json")
			response := httptest.NewRecorder()
			testRouter.ServeHTTP(response, PostLoc)
		}()
	}
	wg.Wait()

	type Res struct {
		Msg  string           `json:"msg"`
		Body []md.GeoLocation `json:"body"`
	}

	getPoints, _ := http.NewRequest("GET", "/api/v1/points/all", nil)
	response := httptest.NewRecorder()
	testRouter.ServeHTTP(response, getPoints)

	res := Res{}
	err = json.Unmarshal(response.Body.Bytes(), &res)

	if len(res.Body) != num_request {
		t.Error("error, count post point don't coincides with get all point")
	}
} // }}}

func _TestPutLocation(t *testing.T) { // {{{
	vars, tmongo, coauth, err := dbTest()
	if err != nil {
		t.Error("err db: ", err)
	}

	testRouter := SetupRouter(vars, tmongo, coauth)

	type Res struct {
		Msg  string         `json:"msg"`
		Body md.GeoLocation `json:"body"`
	}

	// case 1
	{
		point := md.GeoLocation{}
		point.SetRnd()
		jpoint, _ := json.Marshal(point)
		putPoint, _ := http.NewRequest("PUT", "/api/v1/points/", bytes.NewBuffer(jpoint))
		putPoint.Header.Set("X-Custom-Header", "myvalue")
		putPoint.Header.Set("Content-Type", "application/json")
		response := httptest.NewRecorder()
		testRouter.ServeHTTP(response, putPoint)
		res := Res{}
		err = json.Unmarshal(response.Body.Bytes(), &res)
		if err != nil {
			t.Errorf("error put point: %v", err)
		}
		empty_point := md.GeoLocation{}
		if res.Body == empty_point {
			t.Error("error, empty put point")
		}
	}

	// case 2 put point without id
	{
		point := md.GeoLocation{}
		point.SetRnd()
		point.Id = ""
		jpoint, _ := json.Marshal(point)
		putPoint, _ := http.NewRequest("PUT", "/api/v1/points/", bytes.NewBuffer(jpoint))
		putPoint.Header.Set("X-Custom-Header", "myvalue")
		putPoint.Header.Set("Content-Type", "application/json")
		response := httptest.NewRecorder()
		testRouter.ServeHTTP(response, putPoint)
		res := Res{}
		err = json.Unmarshal(response.Body.Bytes(), &res)
		if err != nil {
			t.Errorf("error put point: %v", err)
		}
		empty_point := md.GeoLocation{}
		if res.Body == empty_point {
			t.Error("error, empty put point")
		}
	}

	// case 3 put point 2nd time with diff data
	{
		point := md.GeoLocation{}
		point.SetRnd()
		point.Id = ""
		jpoint, _ := json.Marshal(point)
		putPoint, _ := http.NewRequest("PUT", "/api/v1/points/", bytes.NewBuffer(jpoint))
		putPoint.Header.Set("X-Custom-Header", "myvalue")
		putPoint.Header.Set("Content-Type", "application/json")
		response := httptest.NewRecorder()
		testRouter.ServeHTTP(response, putPoint)
		res := Res{}
		err = json.Unmarshal(response.Body.Bytes(), &res)
		if err != nil {
			t.Errorf("error put point: %v", err)
		}

		putted_point := res.Body
		empty_point := md.GeoLocation{}
		if putted_point == empty_point {
			t.Error("error, empty put point")
		}

		point.SetRnd()
		point.Id = putted_point.Id

		jpoint, _ = json.Marshal(point)
		putPoint, _ = http.NewRequest("PUT", "/api/v1/points/", bytes.NewBuffer(jpoint))
		putPoint.Header.Set("X-Custom-Header", "myvalue")
		putPoint.Header.Set("Content-Type", "application/json")
		response = httptest.NewRecorder()
		testRouter.ServeHTTP(response, putPoint)
		res = Res{}
		err = json.Unmarshal(response.Body.Bytes(), &res)
		if err != nil {
			t.Errorf("error put point 2: %v", err)
		}

		if putted_point.Token == res.Body.Token {
			t.Error("error, put point not changed")
		}

	}
} // }}}

func _TestGeoState(t *testing.T) { // {{{
	num_request := 5

	vars, tmongo, coauth, err := dbTest()
	if err != nil {
		t.Error("err db: ", err)
	}
	testRouter := SetupRouter(vars, tmongo, coauth)

	// start make requests

	point := md.GeoLocation{}
	wg := &sync.WaitGroup{}
	for count := 0; count < num_request; count++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			point.SetRnd()
			jpoint, _ := json.Marshal(point)
			PostLoc, _ := http.NewRequest("POST", "/api/v1/points/state", bytes.NewBuffer(jpoint))
			PostLoc.Header.Set("X-Custom-Header", "myvalue")
			PostLoc.Header.Set("Content-Type", "application/json")
			response := httptest.NewRecorder()
			testRouter.ServeHTTP(response, PostLoc)
		}()
	}
	wg.Wait()

	if len(vars.geoState.Locations) != num_request {
		t.Error("error, count post point to geostate don't coincides with get all point")
	}
} // }}}

func TestGetNearLoc(t *testing.T) {
	vars, tmongo, coauth, err := dbTest()
	if err != nil {
		t.Error("err db: ", err)
	}

	err = tmongo.FillRnd(100)
	if err != nil {
		t.Error("err fill rnd: ", err)
	}

	// fmt.Println("start router")
	testRouter := SetupRouter(vars, tmongo, coauth)

	// start make requests

	type Res struct {
		Msg  string           `json:"msg"`
		Body []md.GeoLocation `json:"body"`
	}

	type ReqNear struct {
		Distance int            `form:"distance" json:"distance"`
		GeoLoc   md.GeoLocation `form:"geoloc" json:"geoloc"`
	}

	res := Res{}

	req := ReqNear{}
	req.GeoLoc.SetRnd()
	req.Distance = 1000000
	jreq, _ := json.Marshal(req)

	// fmt.Println(string(jreq))

	wg := &sync.WaitGroup{}
	for count := 0; count < 2; count++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			getNearLoc, err := http.NewRequest("GET", "/api/v1/points/near", bytes.NewBuffer(jreq))
			if err != nil {
				t.Error("err nearloc: ", err)
			}
			response := httptest.NewRecorder()
			testRouter.ServeHTTP(response, getNearLoc)
			err = json.Unmarshal(response.Body.Bytes(), &res)
			if len(res.Body) == 0 {
				t.Error("error, empty near locations: ", res.Msg)
			}
		}()
	}
	if err != nil {
		t.Errorf("error get near loc: %v", err)
	}
	wg.Wait()
}
