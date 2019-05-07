package main

import (
	"bytes"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
	"net/http/httptest"
	"os"
	"sync"
	"testing"
)

func setTestEnv() {
	os.Setenv(
		"CID",
		"295529031882-ap6njd8e8p0bmggmvkb7t0iflhcetjn1.apps.googleusercontent.com",
	)
	os.Setenv("CSECRET", "ICiVhKO51UxbNfIQVR7WudxH")
	os.Setenv("HOST", "localhost")
	os.Setenv("PORT", "8000")
}

func postReq(eng *gin.Engine, url string, buf *bytes.Buffer) []byte {
	post, _ := http.NewRequest("POST", url, buf)
	post.Header.Set("X-Custom-Header", "myvalue")
	post.Header.Set("Content-Type", "application/json")
	response := httptest.NewRecorder()
	eng.ServeHTTP(response, post)
	return response.Body.Bytes()
}

func TestRouter(t *testing.T) {
	db, err := dbTest()
	if err != nil {
		t.Error("db err: ", err)
	}
	setTestEnv()
	o2 := getOauth2()
	testRouter := router(db, &o2)

	// post/get points
	{
		numRequest := 10
		wg := &sync.WaitGroup{}
		for count := 0; count < numRequest; count++ {
			wg.Add(1)
			go func() {
				defer wg.Done()
				jp, _ := json.Marshal(pointRnd())
				postReq(testRouter, "/api/v1/locs", bytes.NewBuffer(jp))
			}()
		}
		wg.Wait()

		points, _ := http.NewRequest("GET", "/api/v1/locs/all", nil)
		response := httptest.NewRecorder()
		testRouter.ServeHTTP(response, points)

		res := struct {
			Msg  string        `json:"msg"`
			Body []geoLocation `json:"body"`
		}{}
		err = json.Unmarshal(response.Body.Bytes(), &res)
		if err != nil {
			t.Error("err Unmarshal: ", err)
			return
		}

		if len(res.Body) != numRequest {
			t.Error("error, count post point don't coincides with get all point")
			return
		}
	}

	// near
	{
		loc := pointRnd()
		req, _ := json.Marshal(reqNear{
			Scope: 10000000, TGeos: "Point",
			Lat: loc.Location.Coordinates[1],
			Lng: loc.Location.Coordinates[0],
		})
		res := struct {
			Msg  string        `json:"msg"`
			Body []geoLocation `json:"body"`
		}{}

		wg := &sync.WaitGroup{}
		for count := 0; count < 2; count++ {
			wg.Add(1)
			go func() {
				defer wg.Done()
				near, err := http.NewRequest(
					"GET", "/api/v1/locs/near",
					bytes.NewBuffer(req),
				)
				if err != nil {
					t.Error("err near: ", err)
				}
				response := httptest.NewRecorder()
				testRouter.ServeHTTP(response, near)
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
}
