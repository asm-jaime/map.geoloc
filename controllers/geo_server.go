package main

import (
	//"encoding/json"
	"fmt"

	"github.com/julienschmidt/httprouter"
	//"io"
	//"io/ioutil"
	"net/http"
	//"time"
)

var this_state_1 = []byte(`{"state":"good"}`)

func jsonGet(this_writer http.ResponseWriter, this_request *http.Request, this_param httprouter.Params) {
	this_writer.Header().Set("Content-Type", "application/json")
	this_writer.WriteHeader(200)
	err := this_state.AddJsonToIO(&this_writer)
	if err != nil {
		fmt.Print(err)
	}
}

func jsonPost(this_writer http.ResponseWriter, this_request *http.Request, this_param httprouter.Params) {
	this_writer.Header().Set("Content-Type", "application/json")
	this_writer.WriteHeader(201)
	err := this_state.AddJsonFromIO(this_request.Body)
	if err != nil {
		fmt.Print(err)
	}
	err = this_state.AddJsonToIO(&this_writer)
	if err != nil {
		fmt.Print(err)
	}

	fmt.Print(this_state)
}

//json_state, err := json.Marshal(this_state)// {{{
//if err != nil {
//fmt.Print(err)
//}
//fmt.Print(json_state)// }}}

//func jsonHandleGet(this_context echo.Context) error {// {{{
//this_state.Clear()
//this_state.FillRnd(10)
//return this_context.JSON(http.StatusOK, this_state)
//}
// }}}

// package main

// import (
// "github.com/julienschmidt/httprouter"
// "net/http"
// )

// var this_state = NewGeoState()

// func main() {
// this_state.FillRnd(1)
// this_router := httprouter.New()
// this_router.GET("/v1/json_geopos", jsonGet)
// this_router.POST("/v1/json_geopos", jsonPost)

// http.ListenAndServe("localhost:3001", this_router)
// }
