package geoloc

import (
	"fmt"
	"net/http"

	"dvij.geoloc/conf"
	"github.com/gin-gonic/gin"
)

// ========== test

func lockTest(cont *gin.Context) { // {{{
	cont.JSON(200, gin.H{"message: ": "test data"})
} // }}}

// ========== users

func GetUser(c *gin.Context) {
	request := c.Request.URL.Query().Get("id")
	c.JSON(http.StatusOK, conf.GiveResponse(request))
}

// ========== points

func GetPoints(c *gin.Context) { // {{{
	request, err := database.GetAllPoints()

	fmt.Printf("\n##points: %v", request)
	if err != nil {
		c.JSON(http.StatusInternalServerError, msgState.Errors[http.StatusInternalServerError])
	} else {
		c.JSON(http.StatusOK, conf.GiveResponse(request))
	}
} // }}}

func PostPointToGeostate(c *gin.Context) { // {{{
	var request GeoPoint

	err := c.BindJSON(&request)
	fmt.Printf("\n## post point: %v\n", request)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, msgState.Errors[http.StatusBadRequest])
		return
	}

	geoState.Add(&request)

	c.JSON(http.StatusOK, conf.GiveResponse(request))
} // }}}

func PostPoint(c *gin.Context) { // {{{
	var request GeoPoint

	err := c.BindJSON(&request)
	fmt.Printf("\n## post point: %v\n", request)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, msgState.Errors[http.StatusBadRequest])
		return
	}

	err = database.InsertPoint(&request)

	c.JSON(http.StatusOK, conf.GiveResponse(request))
} // }}}

// ========== random points

func GetRndPoint(c *gin.Context) { // {{{
	var request GeoPoint
	request.SetRnd()

	c.JSON(http.StatusOK, conf.GiveResponse(request))
} // }}}

/*
func GetPointFromState(c *gin.Context) { // {{{
	request TokenReq

	err := c.BindJSON(&request)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, msgState.Errors[http.StatusBadRequest])
		return
	}

	if point, ok := geoState.GetPoint(.Id); ok {
		c.JSON(http.StatusOK, conf.GiveResponse(point))
	} else {
		c.JSON(http.StatusNotFound, msgState.Errors[http.StatusNotFound])
	}
} // }}}
*/

// ========== check point

func PutDistance(c *gin.Context) { // {{{
	var request GeoPoint

	err := c.BindJSON(&request)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, msgState.Errors[http.StatusBadRequest])
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
		c.JSON(http.StatusBadRequest, msgState.Errors[http.StatusBadRequest])
		return
	}

	checkPoint = &request

	c.JSON(http.StatusOK, conf.GiveResponse(checkPoint))
} // }}}

// ========== events

func GetEvents(c *gin.Context) { // {{{
	request, err := database.GetAllEvents()
	if err != nil {
		c.JSON(http.StatusNotFound, conf.GiveResponse(err))
	}
	c.JSON(http.StatusOK, conf.GiveResponse(request))
} // }}}

func PostEvent(c *gin.Context) { // {{{
	var request Event

	err := c.BindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, conf.GiveResponse(err))
		return
	}

	err = database.InsertEvent(&request)
	if err != nil {
		c.JSON(http.StatusInternalServerError, conf.GiveResponse(err))
		return
	}
	c.JSON(http.StatusOK, conf.GiveResponse(request))
} // }}}
