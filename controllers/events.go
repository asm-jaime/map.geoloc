package controllers

import (
	"fmt"
	"net/http"

	"dvij.geoloc/conf"
	"dvij.geoloc/models"
	"dvij.geoloc/utils"

	"github.com/julienschmidt/httprouter"
	//"time"
)

func GetNEvents(write http.ResponseWriter, req *http.Request) {
	callback := req.FormValue("callback")
	if callback != "" {
		conf.NewEasyApiError(101, callback)
	}
	write.Header().Set("Content-Type", "application/json")
	jsonBytes, err := models.GetNEvents(0)
	if err != nil {
		fmt.Print(err.Error())
	}
	if callback != "" {
		jsonBytes = []byte(fmt.Sprintf("%s(%s)", callback, jsonBytes))
		write.Write(jsonBytes)
	}
}

func TestMe() {
	//TestInitStructureDataBase()
	TestInsertDviEvents()
	//TestConnectDataBase()
}

func TestMakeArrayEvents() {
	this_array := models.MakeArrayEvents(24)
	fmt.Print(this_array)
}

func TestInsertDviEvents() {
	this_array := models.MakeArrayEvents(24)
	err := models.InsertDviEvents(this_array)
	if err != nil {
		fmt.Print(err.Error())
	}
}

func TestMakeInterfaceEvents() {
	//this_array := models.MakeInterfaceEvents(4)
	//fmt.Print(this_array)
}

func TestInsertArrayEvents() {
	this_array := models.MakeArrayEvents(4)
	err := models.InsertArrayEvents(this_array)
	if err != nil {
		fmt.Print(err.Error())
	}
}

func TestInitStructureDataBase() {
	err := models.DropDataBase()
	err = models.InitStructureDataBase()
	err = models.StdFillDataBase(10)
	if err != nil {
		fmt.Print(err.Error())
	}
}

func TestConnectDataBase() {
	this_session := utils.NewDbSession()
	defer this_session.Close()
	fmt.Print(this_session)
}

func Hello(write http.ResponseWriter, req *http.Request, params httprouter.Params) {
	fmt.Fprintf(write, "hello, %s!\n", params.ByName("name"))
}
