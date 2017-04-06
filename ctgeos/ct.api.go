package ctgeos

import (
	"net/http"

	// "dvij.geoloc/conf"
	md "dvij.geoloc/mdgeos"
	"github.com/gin-gonic/gin"
)

// ========== points

func GetPoints(c *gin.Context) {
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "database don't available", "body": nil})
	}
	req, err := mongo.GetPoints()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't get points from db", "body": nil})
	} else {
		c.JSON(http.StatusOK, gin.H{"msg": "get points complete", "body": req})
	}
}

/*
func PostPointToGeostate(c *gin.Context) { // {{{
	var req GeoPoint
	err := c.Bind(&req)
	fmt.Printf("\n## post point: %v\n", req)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, msgState.Errors[http.StatusBadRequest])
		return
	}
	geoState.Add(&req)
	c.JSON(http.StatusOK, conf.GiveResponse(request))
} // }}}

func PostPoint(c *gin.Context) {
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "database don't available", "body": nil})
	}
	var req md.GeoPoint
	err := c.Bind(&req)
	// fmt.Printf("\n## post point: %v\n", request)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": "can't post point", "body": nil})
		return
	}

	err = mongo.PostPoint(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't post point", "body": nil})
		return
	}

	c.JSON(http.StatusOK, conf.GiveResponse(request))
}
*/
// ========== random points

func GetRndPoint(c *gin.Context) {
	var req md.GeoPoint
	req.SetRnd()

	c.JSON(http.StatusOK, gin.H{"msg": "get rnd point complete", "body": req})
}

// ========== check point
/*
func GetDistance(c *gin.Context) {// {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "database don't available", "body": nil})
	}

	session := sessions.Default(c)
	usermail := session.Get("user-id")
	upoint := md.GeoPoint{}
	upoint.Email = usermail

	upoint = md

	var req GeoPoint
	err := c.Bind(&req)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"msg": "", "body": nil})
		return
	}
	distance := checkPoint.GetDistance(&request)

	c.JSON(http.StatusOK, conf.GiveResponse(distance))
}// }}}

// ========== events

func GetEvents(c *gin.Context) {
	mongo, ok := c.Keys["mongo"].(*MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "database don't available", "body": nil})
	}

	req, err := mongo.GetEvents()
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"msg": "events not found", "body": nil})
	}
	c.JSON(http.StatusOK, gin.H{"msg": "get events successful complete", "body": req})
}

func PostEvent(c *gin.Context) {
	mongo, ok := c.Keys["mongo"].(*MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "database don't available", "body": nil})
	}

	var req Event
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}
	err = mongo.PostEvent(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
		return
	}
	c.JSON(http.StatusOK, gin.H{"msg": "post event successful complete", "body": req})
}

*/
