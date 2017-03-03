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

// ========== points

func GetPoints(c *gin.Context) { // {{{
	fmt.Printf("\ngeost: %v", geoState)
	if len(geoState.Points) > 0 {
		c.JSON(http.StatusOK, conf.GiveResponse(geoState.Points))
	} else {
		c.JSON(http.StatusInternalServerError, msgState.Errors[http.StatusInternalServerError])
	}
} // }}}

func PostPoint(c *gin.Context) { // {{{
	var request GeoPoint

	err := c.BindJSON(&request)
	// fmt.Printf("\nreq: %v", request)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, msgState.Errors[http.StatusBadRequest])
		return
	}

	geoState.Add(&request)

	c.JSON(http.StatusOK, conf.GiveResponse(request))
} // }}}

// ========== random points

func GetRndPoint(c *gin.Context) {
	var request GeoPoint
	request.SetRnd()

	c.JSON(http.StatusOK, conf.GiveResponse(request))
}

func PostRndPoint(c *gin.Context) {
	var request GeoPoint

	err := c.BindJSON(&request)
	if err != nil {
		fmt.Print(err)
		c.JSON(http.StatusBadRequest, msgState.Errors[http.StatusBadRequest])
		return
	}

	geoState.Add(&request)

	c.JSON(http.StatusOK, conf.GiveResponse(request))
}

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
