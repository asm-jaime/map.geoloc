package main

import (
	gen "github.com/asm-jaime/gen"
	"log"
	"net/http"

	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
)

// ========== user

func getUsers(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		req, err := mongo.getUsers()
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
		} else {
			c.JSON(http.StatusOK,
				gin.H{"msg": "get points complete", "body": req})
		}
	}
}

func getUser(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req geoUser
		err := c.Bind(&req)
		if err != nil {
			c.JSON(http.StatusBadRequest,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}

		req, err = mongo.getUser(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
		} else {
			c.JSON(http.StatusOK,
				gin.H{"msg": "get user complete", "body": req})
		}
	}
}

func postUser(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		mongo, ok := c.Keys["mongo"].(*mongoDB)
		if !ok {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": "can't connect to db", "body": nil})
		}
		var req geoUser
		err := c.Bind(&req)
		if err != nil {
			c.JSON(http.StatusBadRequest,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}

		err = mongo.postUser(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}

		c.JSON(http.StatusOK, gin.H{"msg": "post user complete", "body": req})
	}
}

func putUser(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req geoUser

		err := c.Bind(&req)
		if err != nil {
			c.JSON(http.StatusBadRequest,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}

		if req.ID.Hex() != "" {
			err = mongo.updateUser(&req)
			if err != nil {
				c.JSON(http.StatusInternalServerError,
					gin.H{"msg": err.Error(), "body": nil})
				return
			}
		} else {
			log.Println("no id and post user: ", req)
			err = mongo.postUser(&req)
			if err != nil {
				c.JSON(http.StatusInternalServerError,
					gin.H{"msg": err.Error(), "body": nil})
				return
			}
		}

		c.JSON(http.StatusOK, gin.H{"msg": "post user complete", "body": req})
	}
}

func delUser(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req geoUser
		err := c.Bind(&req)
		if err != nil {
			c.JSON(http.StatusBadRequest,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}

		err = mongo.delUser(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}

		c.JSON(http.StatusOK, gin.H{"msg": "del user complete", "body": req})
	}
}

// ========== event

func getEvents(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		req, err := mongo.getEvents()
		if err != nil {
			c.JSON(http.StatusNotFound,
				gin.H{"msg": "events not found", "body": nil})
		} else {
			c.JSON(http.StatusOK,
				gin.H{"msg": "get events successful complete", "body": req})
		}
	}
}

func getEvent(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req geoEvent
		err := c.Bind(&req)
		if err != nil {
			c.JSON(http.StatusBadRequest,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}

		req, err = mongo.getEvent(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
		} else {
			c.JSON(http.StatusOK,
				gin.H{"msg": "get event complete", "body": req})
		}
	}
}

func postEvent(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		mongo, ok := c.Keys["mongo"].(*mongoDB)
		if !ok {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": "can't connect to db", "body": nil})
		}

		var req geoEvent
		err := c.Bind(&req)
		if err != nil {
			c.JSON(http.StatusBadRequest,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}

		err = mongo.postEvent(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
		} else {
			c.JSON(http.StatusOK,
				gin.H{"msg": "post event complete", "body": req})
		}
	}
}

func putEvent(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req geoEvent
		err := c.Bind(&req)
		if err != nil {
			c.JSON(http.StatusBadRequest,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}

		if req.ID.Hex() != "" {
			err = mongo.updateEvent(&req)
			if err != nil {
				c.JSON(http.StatusInternalServerError,
					gin.H{"msg": err.Error(), "body": nil})
				return
			}
		} else {
			err = mongo.postEvent(&req)
			if err != nil {
				c.JSON(http.StatusInternalServerError,
					gin.H{"msg": err.Error(), "body": nil})
				return
			}
		}

		c.JSON(http.StatusOK,
			gin.H{"msg": "put event complete", "body": req})
	}
}

func delEvent(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		mongo, ok := c.Keys["mongo"].(*mongoDB)
		if !ok {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": "can't connect to db", "body": nil})
		}
		var req geoEvent
		err := c.Bind(&req)
		if err != nil {
			c.JSON(http.StatusBadRequest,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}

		err = mongo.delEvent(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
		} else {
			c.JSON(http.StatusOK,
				gin.H{"msg": "del event complete", "body": req})
		}
	}
}

// ========== locations

func getLocs(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		req, err := mongo.getLocs()
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
		} else {
			c.JSON(http.StatusOK,
				gin.H{"msg": "get points complete", "body": req})
		}
	}
}

func getLoc(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req geoLocation
		err := c.Bind(&req)
		if err != nil {
			c.JSON(http.StatusBadRequest,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}

		req, err = mongo.getLoc(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
		} else {
			c.JSON(http.StatusOK,
				gin.H{"msg": "get points complete", "body": req})
		}
	}
}

func postLoc(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req geoLocation
		err := c.Bind(&req)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
			return
		}

		point, err := mongo.postLoc(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
		} else {
			c.JSON(http.StatusOK,
				gin.H{"msg": "post point complete", "body": point})
		}
	}
}

func putLoc(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req geoLocation
		err := c.Bind(&req)
		if err != nil {
			c.JSON(http.StatusBadRequest,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}

		if req.ID.Hex() != "" {
			err = mongo.updateLoc(&req)
			if err != nil {
				point, err := mongo.postLoc(&req)
				if err != nil {
					c.JSON(http.StatusInternalServerError,
						gin.H{"msg": err.Error(), "body": point})
					return
				}
			}
		} else {
			_, err := mongo.postLoc(&req)
			if err != nil {
				c.JSON(http.StatusInternalServerError,
					gin.H{"msg": err.Error(), "body": nil})
				return
			}
		}

		c.JSON(http.StatusOK, gin.H{"msg": "post point complete", "body": req})
	}
}

func delLoc(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req geoLocation
		err := c.Bind(&req)
		if err != nil {
			c.JSON(http.StatusBadRequest,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}

		err = mongo.delLoc(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}

		c.JSON(http.StatusOK, gin.H{"msg": "del point complete", "body": req})
	}
}

// ========== location+event

func postGeoEvent(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req reqGeoEvent
		err := c.Bind(&req)
		if err != nil {
			c.JSON(http.StatusBadRequest,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}

		res, err := mongo.postGeoEvent(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}

		c.JSON(http.StatusOK, gin.H{"msg": "post geoevent complete", "body": res})
	}
}

// ========== check location

func getDistance(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req geoLocation
		err := c.BindJSON(&req)
		if err != nil {
			c.JSON(http.StatusBadRequest,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}

		session := sessions.Default(c)
		user := geoUser{}
		user.Email = session.Get("user-id").(string)
		user, err = mongo.getUser(&user)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}

		point := geoLocation{}
		point.ID = user.ID
		point, err = mongo.getLoc(&point)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}

		dist := distance(&point, &req)

		c.JSON(http.StatusOK,
			gin.H{"msg": "get distance complete", "body": dist})
	}
}

// ========== positioning location

func getNearLoc(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req reqNear
		err := c.BindJSON(&req)

		if err != nil {
			c.JSON(http.StatusBadRequest,
				gin.H{"msg": err.Error(), "body": nil})
			return
		}

		locs, err := mongo.getNearLoc(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
		} else {
			c.JSON(http.StatusOK,
				gin.H{"msg": "get points complete", "body": locs})
		}
	}
}

// ========== filtered location

func getFiltered(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req reqFilter
		err := c.Bind(&req)
		// fmt.Println(req)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "body": nil})
			return
		}

		elocs, err := mongo.getFiltered(&req)
		// fmt.Println(elocs)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
		} else {
			c.JSON(http.StatusOK,
				gin.H{"msg": "get filtered event-loc complete", "body": elocs})
		}
	}
}

func router(db *mongoDB, o2 *oauth2.Config) *gin.Engine {
	router := gin.Default()
	store := sessions.NewCookieStore([]byte(gen.TokenB64(64)))
	store.Options(sessions.Options{Path: "/", MaxAge: 86400 * 7})

	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(sessions.Sessions("goquestsession", store))

	router.Use(middlewareCORS())

	router.Use(static.Serve("/", static.LocalFile(STATIC_FOLDER, true)))
	router.LoadHTMLGlob(STATIC_FOLDER + "/index.html")

	api := router.Group("api")
	{
		v1 := api.Group("v1")
		{
			user := v1.Group("users")
			{
				user.GET("", getUser(db))
				user.POST("", postUser(db))
				user.PUT("", putUser(db))
				user.DELETE("", delUser(db))

				user.GET("/all", getUsers(db))
			}
			event := v1.Group("events")
			{
				event.GET("", getEvent(db))
				event.POST("", postEvent(db))
				event.PUT("", putEvent(db))
				event.DELETE("", delEvent(db))

				event.GET("/all", getEvents(db))
			}
			point := v1.Group("locs")
			{
				point.GET("", getLoc(db))
				point.POST("", postLoc(db))
				point.PUT("", putLoc(db))
				point.DELETE("", delLoc(db))

				point.POST("/geoevent", postGeoEvent(db))

				point.GET("/all", getLocs(db))
				point.GET("/near", getNearLoc(db))
				point.GET("/filter", getFiltered(db))
			}
			auth := v1.Group("auth")
			{
				auth.GET("/login", login(o2))
				auth.GET("/auth", authO2(db, o2))
			}
			lock := v1.Group("/protected")
			lock.Use(middlewareAuth())
			{
				lock.GET("", getLocs(db))
			}
		}
	}
	router.NoRoute(noRoute)

	return router
}
