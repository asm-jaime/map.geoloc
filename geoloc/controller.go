package geoloc

import (
	"fmt"
	"net/http"

	"dvij.geoloc/conf"

	"github.com/gin-gonic/gin"
)

// GetPoints get all points
func GetPoints(c *gin.Context) { // {{{
	fmt.Printf("\ngeost: %v", geoState)
	if len(geoState.Location) > 0 {
		c.JSON(http.StatusOK, conf.GiveResponse(geoState.Location))
	} else {
		c.JSON(http.StatusInternalServerError, MsgState.Errors[http.StatusInternalServerError])
	}
} // }}}

func PostPoint(c *gin.Context) {
	var request GeoPoint

	err := c.BindJSON(&request)
	// fmt.Printf("\nreq: %v", request)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, MsgState.Errors[http.StatusBadRequest])
		return
	}

	geoState.Add(&request)

	c.JSON(http.StatusOK, conf.GiveResponse(request))
}

func GetRndPoint(c *gin.Context) { // {{{
	var request GeoPoint
	request.SetRnd()

	c.JSON(http.StatusOK, conf.GiveResponse(request))
} // }}}

func PostRndPoint(c *gin.Context) { // {{{
	var request GeoPoint

	err := c.BindJSON(&request)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, MsgState.Errors[http.StatusBadRequest])
		return
	}

	geoState.Add(&request)

	c.JSON(http.StatusOK, conf.GiveResponse(request))
} // }}}

func GetPointFromToken(c *gin.Context) { // {{{

	token := c.Request.URL.Query().Get("token")
	if token == "" {
		c.JSON(http.StatusBadRequest, MsgState.Errors[http.StatusBadRequest])
		return
	}
	fmt.Printf("\n## get point: %s\n", token)

	if point, ok := geoState.GetPoint(token); ok {
		c.JSON(http.StatusOK, conf.GiveResponse(point))
	} else {
		c.JSON(http.StatusNotFound, MsgState.Errors[http.StatusNotFound])
	}
} // }}}

func PutDistance(c *gin.Context) { // {{{
	var request GeoPoint

	err := c.BindJSON(&request)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, MsgState.Errors[http.StatusBadRequest])
		return
	}

	geoState.Add(&request)
	distance := checkPoint.GetDistance(&request)

	c.JSON(http.StatusOK, conf.GiveResponse(distance))
} // }}}

func GetCheckPoint(c *gin.Context) { // {{{
	c.JSON(http.StatusOK, conf.GiveResponse(checkPoint))
} // }}}

func PostCheckPoint(c *gin.Context) { // {{{
	var request GeoPoint

	err := c.BindJSON(&request)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, MsgState.Errors[http.StatusBadRequest])
		return
	}

	checkPoint = &request

	c.JSON(http.StatusOK, conf.GiveResponse(checkPoint))
} // }}}

// GetNEvents df
func GetNEvents(context *gin.Context) {
	var err error
	callback := context.Value("callback")
	if callback != "" {
		// conf.NewEasyAPIError(101, callback)
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
