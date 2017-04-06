package ctgeos

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"sync"
	"testing"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"

	"dvij.geoloc/conf"
	md "dvij.geoloc/mdgeos"
)

func dbTest() (*md.MongoDB, *oauth2.Config) {
	mg := &md.MongoDB{}
	mg.SetDefault()
	mg.Database = "test"
	mg.Info = mg.MgoConfig()

	config := conf.ServerConfig{}
	config.SetDefault()

	coauth := &oauth2.Config{
		ClientID:     config.Cred.Cid,
		ClientSecret: config.Cred.Csecret,
		RedirectURL:  "http://" + config.Host + ":" + config.Port + "/auth",
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
		},
		Endpoint: google.Endpoint,
	}

	return mg, coauth
}

func dbProduct() *md.MongoDB {
	mg := &md.MongoDB{}
	mg.SetDefault()
	mg.Info = mg.MgoConfig()
	return mg
}

func _TestGetPostData(t *testing.T) { // {{{
	tmongo, coauth := dbTest()
	err := tmongo.SetSession()
	if err != nil {
		t.Error("error set session: ", err)
	}

	fmt.Println("start router")
	testRouter := SetupRouter(tmongo, coauth)

	// start make requests
	getRndPoint, err := http.NewRequest("GET", "/api/v1/points/random", nil)
	getPoints, err := http.NewRequest("GET", "/api/v1/points", nil)
	/*
		postValues := url.Values{}
		postValues.Set("data", md.RndStr(4))
		postDataStr := postValues.Encode()
		postDataBytes := []byte(postDataStr)
		postBytesReader := bytes.NewReader(postDataBytes)
		post, err := http.NewRequest("POST", "/PostPoint", postBytesReader)
	*/

	wg := &sync.WaitGroup{}
	for count := 0; count < 2; count++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			response := httptest.NewRecorder()
			testRouter.ServeHTTP(response, getRndPoint)
			testRouter.ServeHTTP(response, getPoints)
			fmt.Println(response.Body)
		}()
	}
	wg.Wait()
} // }}}

func TestPoint(t *testing.T) {
	tmongo, coauth := dbTest()
	err := tmongo.SetSession()
	if err != nil {
		t.Error("error set session: ", err)
	}

	fmt.Println("start router")
	testRouter := SetupRouter(tmongo, coauth)

	// start make requests

	point := md.GeoPoint{}

	wg := &sync.WaitGroup{}
	for count := 0; count < 6; count++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			point.SetRnd()
			jpoint, _ := json.Marshal(point)
			postPoint, _ := http.NewRequest("POST", "/api/v1/points/", bytes.NewBuffer(jpoint))

			postPoint.Header.Set("X-Custom-Header", "myvalue")
			postPoint.Header.Set("Content-Type", "application/json")

			response := httptest.NewRecorder()
			testRouter.ServeHTTP(response, postPoint)
			fmt.Println(response.Body)
		}()
	}
	wg.Wait()

	// response := httptest.NewRecorder()
	// testRouter.ServeHTTP(response, postPoint)
	// fmt.Println(response.Body)

}
