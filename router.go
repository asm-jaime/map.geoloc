package main

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func router(db *mongoDB) *gin.Engine {
	router := gin.Default()
	gin.SetMode(gin.DebugMode)
	router.Use(middlewareDB(db))

	router.Use(static.Serve("/", static.LocalFile(STATIC_FOLDER, false)))

	api := router.Group("api")
	api.Use(middlewareCORS())
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
		}
	}

	router.NoRoute(returnPublic())

	return router
}
