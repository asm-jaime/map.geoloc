package ctgeos

import (
	"net/http"

	// "dvij.geoloc/conf"
	md "dvij.geoloc/mdgeos"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
)

// ========== user

func GetUsers(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't connect to db", "body": nil})
	}

	req, err := mongo.GetUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
	} else {
		c.JSON(http.StatusOK, gin.H{"msg": "get points complete", "body": req})
	}
} // }}}

func GetUser(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't connect to db", "body": nil})
	}

	var req md.User
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	req, err = mongo.GetUser(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
	} else {
		c.JSON(http.StatusOK, gin.H{"msg": "get user complete", "body": req})
	}
} // }}}

func PostUser(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't connect to db", "body": nil})
	}
	var req md.User
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	err = mongo.PostUser(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	c.JSON(http.StatusOK, gin.H{"msg": "post user complete", "body": req})
} // }}}

func PutUser(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't connect to db", "body": nil})
	}
	var req md.User
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	if req.Id.Hex() != "" {
		err = mongo.UpdateUser(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
			return
		}
	} else {
		err = mongo.PostUser(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"msg": "post user complete", "body": req})
} // }}}

func DelUser(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't connect to db", "body": nil})
	}
	var req md.User
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	err = mongo.DelUser(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	c.JSON(http.StatusOK, gin.H{"msg": "del user complete", "body": req})
} // }}}

// ========== event

func GetEvents(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't connect to db", "body": nil})
	}

	req, err := mongo.GetEvents()
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"msg": "events not found", "body": nil})
	}
	c.JSON(http.StatusOK, gin.H{"msg": "get events successful complete", "body": req})
} // }}}

func GetEvent(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't connect to db", "body": nil})
	}

	var req md.Event
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	req, err = mongo.GetEvent(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
	} else {
		c.JSON(http.StatusOK, gin.H{"msg": "get event complete", "body": req})
	}
} // }}}

func PostEvent(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't connect to db", "body": nil})
	}

	var req md.Event
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
	c.JSON(http.StatusOK, gin.H{"msg": "post event complete", "body": req})
} // }}}

func PutEvent(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't connect to db", "body": nil})
	}
	var req md.Event
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	if req.Id.Hex() != "" {
		err = mongo.UpdateEvent(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
			return
		}
	} else {
		err = mongo.PostEvent(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"msg": "put event complete", "body": req})
} // }}}

func DelEvent(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't connect to db", "body": nil})
	}
	var req md.Event
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	err = mongo.DelEvent(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	c.JSON(http.StatusOK, gin.H{"msg": "del event complete", "body": req})
} // }}}

// ========== group

func GetGroups(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't connect to db", "body": nil})
	}

	req, err := mongo.GetGroups()
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"msg": "groups not found", "body": nil})
	}
	c.JSON(http.StatusOK, gin.H{"msg": "get groups successful complete", "body": req})
} // }}}

func GetGroup(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't connect to db", "body": nil})
	}

	var req md.Group
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	req, err = mongo.GetGroup(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
	} else {
		c.JSON(http.StatusOK, gin.H{"msg": "get group complete", "body": req})
	}
} // }}}

func PostGroup(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't connect to db", "body": nil})
	}

	var req md.Group
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	err = mongo.PostGroup(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
		return
	}
	c.JSON(http.StatusOK, gin.H{"msg": "post group complete", "body": req})
} // }}}

func PutGroup(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't connect to db", "body": nil})
	}
	var req md.Group
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	if req.Id.Hex() != "" {
		err = mongo.UpdateGroup(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
			return
		}
	} else {
		err = mongo.PostGroup(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"msg": "put group complete", "body": req})
} // }}}

func DelGroup(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't connect to db", "body": nil})
	}
	var req md.Group
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	err = mongo.DelGroup(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	c.JSON(http.StatusOK, gin.H{"msg": "del group complete", "body": req})
} // }}}

// ========== points

func GetPoints(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't connect to db", "body": nil})
	}

	req, err := mongo.GetPoints()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
	} else {
		c.JSON(http.StatusOK, gin.H{"msg": "get points complete", "body": req})
	}
} // }}}

func GetPoint(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't connect to db", "body": nil})
	}

	var req md.GeoPoint
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	req, err = mongo.GetPoint(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
	} else {
		c.JSON(http.StatusOK, gin.H{"msg": "get points complete", "body": req})
	}
} // }}}

func PostPoint(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't connect to db", "body": nil})
	}
	var req md.GeoPoint
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	point, err := mongo.PostPoint(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	c.JSON(http.StatusOK, gin.H{"msg": "post point complete", "body": point})
} // }}}

func PutPoint(c *gin.Context) {
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't connect to db", "body": nil})
	}
	var req md.GeoPoint
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	if req.Id.Hex() != "" {
		err = mongo.UpdatePoint(&req)
		if err != nil {
			point, err := mongo.PostPoint(&req)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": point})
				return
			}
		}
	} else {
		_, err := mongo.PostPoint(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"msg": "post point complete", "body": req})
}

func DelPoint(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't connect to db", "body": nil})
	}
	var req md.GeoPoint
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	err = mongo.DelPoint(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	c.JSON(http.StatusOK, gin.H{"msg": "del point complete", "body": req})
} // }}}

func PostPointToGeostate(c *gin.Context) { // {{{
	vars, ok := c.Keys["vars"].(*Vars)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "can't get vars from context", "body": nil})
		return
	}

	var req md.GeoPoint
	err := c.Bind(&req)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}
	vars.geoState.Add(&req)
	c.JSON(http.StatusOK, gin.H{"msg": "post point to geostate complete", "body": req})
} // }}}

//========== random

func GetRndPoint(c *gin.Context) { // {{{
	var req md.GeoPoint
	req.SetRnd()

	c.JSON(http.StatusOK, gin.H{"msg": "get rnd point complete", "body": req})
} // }}}

// ========== check point

func GetDistance(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "database don't available", "body": nil})
	}

	var req md.GeoPoint
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	session := sessions.Default(c)
	user := md.User{}
	user.Email = session.Get("user-id").(string)
	user, err = mongo.GetUser(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	point := md.GeoPoint{}
	point.Id = user.Id
	point, err = mongo.GetPoint(&point)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "body": nil})
		return
	}

	distance := point.GetDistance(&req)

	c.JSON(http.StatusOK, gin.H{"msg": "get distance complete", "body": distance})
} // }}}
