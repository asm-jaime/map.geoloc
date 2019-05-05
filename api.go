package controller

import (
	"fmt"
	"net/http"

	// "map.geoloc/backend/conf"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
	md "map.geoloc/backend/model"
)

// ========== user

func GetUsers(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "can't connect to db", "body": nil})
	}

	req, err := mongo.GetUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": err.Error(), "body": nil})
	} else {
		c.JSON(http.StatusOK,
			gin.H{"msg": "get points complete", "body": req})
	}
} // }}}

func GetUser(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "can't connect to db", "body": nil})
	}

	var req md.User
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"msg": err.Error(), "body": nil})
		return
	}

	req, err = mongo.GetUser(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": err.Error(), "body": nil})
	} else {
		c.JSON(http.StatusOK,
			gin.H{"msg": "get user complete", "body": req})
	}
} // }}}

func PostUser(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "can't connect to db", "body": nil})
	}
	var req md.User
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"msg": err.Error(), "body": nil})
		return
	}

	err = mongo.PostUser(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": err.Error(), "body": nil})
		return
	}

	c.JSON(http.StatusOK, gin.H{"msg": "post user complete", "body": req})
} // }}}

func PutUser(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "can't connect to db", "body": nil})
	}

	var req md.User
	err := c.Bind(&req)

	if err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"msg": err.Error(), "body": nil})
		return
	}

	if req.Id.Hex() != "" {
		err = mongo.UpdateUser(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}
	} else {
		fmt.Println("no id and post user: ", req)
		err = mongo.PostUser(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"msg": "post user complete", "body": req})
} // }}}

func DelUser(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "can't connect to db", "body": nil})
	}
	var req md.User
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"msg": err.Error(), "body": nil})
		return
	}

	err = mongo.DelUser(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": err.Error(), "body": nil})
		return
	}

	c.JSON(http.StatusOK, gin.H{"msg": "del user complete", "body": req})
} // }}}

// ========== event

func GetEvents(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "can't connect to db", "body": nil})
	}

	req, err := mongo.GetEvents()
	if err != nil {
		c.JSON(http.StatusNotFound,
			gin.H{"msg": "events not found", "body": nil})
	} else {
		c.JSON(http.StatusOK,
			gin.H{"msg": "get events successful complete", "body": req})
	}
} // }}}

func GetEvent(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "can't connect to db", "body": nil})
	}

	var req md.Event
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"msg": err.Error(), "body": nil})
		return
	}

	req, err = mongo.GetEvent(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": err.Error(), "body": nil})
	} else {
		c.JSON(http.StatusOK,
			gin.H{"msg": "get event complete", "body": req})
	}
} // }}}

func PostEvent(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "can't connect to db", "body": nil})
	}

	var req md.Event
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"msg": err.Error(), "body": nil})
		return
	}

	err = mongo.PostEvent(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": err.Error(), "body": nil})
	} else {
		c.JSON(http.StatusOK,
			gin.H{"msg": "post event complete", "body": req})
	}
} // }}}

func PutEvent(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "can't connect to db", "body": nil})
	}
	var req md.Event
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"msg": err.Error(), "body": nil})
		return
	}

	if req.Id.Hex() != "" {
		err = mongo.UpdateEvent(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}
	} else {
		err = mongo.PostEvent(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}
	}

	c.JSON(http.StatusOK,
		gin.H{"msg": "put event complete", "body": req})
} // }}}

func DelEvent(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "can't connect to db", "body": nil})
	}
	var req md.Event
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"msg": err.Error(), "body": nil})
		return
	}

	err = mongo.DelEvent(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": err.Error(), "body": nil})
	} else {
		c.JSON(http.StatusOK,
			gin.H{"msg": "del event complete", "body": req})
	}
} // }}}

// ========== locations

func GetLocs(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "can't connect to db", "body": nil})
	}

	req, err := mongo.GetLocs()
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": err.Error(), "body": nil})
	} else {
		c.JSON(http.StatusOK,
			gin.H{"msg": "get points complete", "body": req})
	}
} // }}}

func GetLoc(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "can't connect to db", "body": nil})
	}

	var req md.GeoLocation
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"msg": err.Error(), "body": nil})
		return
	}

	req, err = mongo.GetLoc(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": err.Error(), "body": nil})
	} else {
		c.JSON(http.StatusOK,
			gin.H{"msg": "get points complete", "body": req})
	}
} // }}}

func PostLoc(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "can't connect to db", "body": nil})
	}
	var req md.GeoLocation
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	fmt.Println(req)
	point, err := mongo.PostLoc(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": err.Error(), "body": nil})
	} else {
		c.JSON(http.StatusOK,
			gin.H{"msg": "post point complete", "body": point})
	}
} // }}}

func PutLoc(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "can't connect to db", "body": nil})
	}
	var req md.GeoLocation
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"msg": err.Error(), "body": nil})
		return
	}

	if req.Id.Hex() != "" {
		err = mongo.UpdateLoc(&req)
		if err != nil {
			point, err := mongo.PostLoc(&req)
			if err != nil {
				c.JSON(http.StatusInternalServerError,
					gin.H{"msg": err.Error(), "body": point})
				return
			}
		}
	} else {
		_, err := mongo.PostLoc(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"msg": "post point complete", "body": req})
} // }}}

func DelLoc(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "can't connect to db", "body": nil})
	}
	var req md.GeoLocation
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"msg": err.Error(), "body": nil})
		return
	}

	err = mongo.DelLoc(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": err.Error(), "body": nil})
		return
	}

	c.JSON(http.StatusOK, gin.H{"msg": "del point complete", "body": req})
} // }}}

func PostLocToGeoState(c *gin.Context) { // {{{
	vars, ok := c.Keys["vars"].(*Vars)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "can't get vars from context", "body": nil})
		return
	}

	var req md.GeoLocation
	err := c.Bind(&req)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}
	vars.geoState.Add(&req)
	c.JSON(http.StatusOK, gin.H{"msg": "post point to geostate complete", "body": req})
} // }}}

// ========== location+event

func PostGeoEvent(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "can't connect to db", "body": nil})
	}
	var req md.ReqGeoEvent
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"msg": err.Error(), "body": nil})
		return
	}

	fmt.Println(req)
	res, err := mongo.PostGeoEvent(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": err.Error(), "body": nil})
		return
	}

	c.JSON(http.StatusOK, gin.H{"msg": "post geoevent complete", "body": res})
} // }}}

//========== random

func GetRndLoc(c *gin.Context) { // {{{
	var req []md.GeoLocation
	geoloc := md.GeoLocation{}

	for i := 0; i < 20; i++ {
		geoloc.SetRnd()
		req = append(req, geoloc)
	}

	c.JSON(http.StatusOK, gin.H{"msg": "get rnd point complete", "body": req})
} // }}}

// ========== check location

func GetDistance(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "database don't available", "body": nil})
	}

	var req md.GeoLocation
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"msg": err.Error(), "body": nil})
		return
	}

	session := sessions.Default(c)
	user := md.User{}
	user.Email = session.Get("user-id").(string)
	user, err = mongo.GetUser(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": err.Error(), "body": nil})
		return
	}

	point := md.GeoLocation{}
	point.Id = user.Id
	point, err = mongo.GetLoc(&point)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": err.Error(), "body": nil})
		return
	}

	distance := point.GetDistance(&req)

	c.JSON(http.StatusOK,
		gin.H{"msg": "get distance complete", "body": distance})
} // }}}

// ========== positioning location

func GetNearLoc(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "can't connect to db", "body": nil})
	}

	var req md.ReqNear
	err := c.Bind(&req)
	fmt.Println(req)

	if err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"msg": err.Error(), "body": nil})
		return
	}

	locs, err := mongo.GetNearLoc(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": err.Error(), "body": nil})
	} else {
		c.JSON(http.StatusOK,
			gin.H{"msg": "get points complete", "body": locs})
	}
} // }}}

// ========== filtered location

func GetFiltered(c *gin.Context) {
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "can't connect to db", "body": nil})
	}

	var req md.ReqFilter
	err := c.Bind(&req)
	// fmt.Println(req)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	elocs, err := mongo.GetFiltered(&req)
	// fmt.Println(elocs)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": err.Error(), "body": nil})
	} else {
		c.JSON(http.StatusOK,
			gin.H{"msg": "get filtered event-loc complete", "body": elocs})
	}
}