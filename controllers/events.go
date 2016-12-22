package controllers

import (
	"fmt"

	"dvij.geoloc/models"
	"github.com/gin-gonic/gin"
	//"time"
)

// GetNEvents df
func GetNEvents(context *gin.Context) {
	var err error
	callback := context.Value("callback")
	if callback != "" {
		// conf.NewEasyApiError(101, callback)
	}
	context.Request.Header.Set("Content-Type", "application/json")

	thisEvents := models.NewEvents()
	err = thisEvents.GetNEvents(10)
	if err != nil {
		fmt.Print(err.Error())
	}
	if callback != "" {
		var jsonEvents []byte
		jsonEvents, err = thisEvents.GetAsJSON()
		jsonEvents = []byte(fmt.Sprintf("%s(%s)", callback, jsonEvents))
		context.Writer.Write(jsonEvents)
	}
}
