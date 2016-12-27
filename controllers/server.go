package controllers

import (
	"dvij.geoloc/models"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

// Server for you
type Server struct{}

func testData(cont *gin.Context) {
	cont.String(200, "test data")
}

// NewEngine return the new gin server
func (server *Server) NewEngine(thisPort string) {
	router := gin.Default()

	// support sessions
	store := sessions.NewCookieStore([]byte(models.RandToken(64)))
	store.Options(sessions.Options{
		Path:   "/",
		MaxAge: 86400 * 7,
	})
	// router
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(sessions.Sessions("goquestsession", store))

	// all frontend
	router.Use(static.Serve("/", static.LocalFile("./public", true)))

	// login
	router.GET("/login", LoginHandler)
	router.GET("/auth", AuthHandler)

	// v1 group: here is API for authorized query
	authorized := router.Group("/v1")
	authorized.Use(AuthorizeRequest())
	{
		authorized.GET("/test", testData)
	}

	router.Run(":" + thisPort)

}
