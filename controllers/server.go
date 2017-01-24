package controllers

import (
	"fmt"

	"dvij.geoloc/models"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

// Server for you
type Server struct{}

func testData(cont *gin.Context) {
	cont.JSON(200, gin.H{"message: ": "test data"})
}

// CORSMiddleware middleware witch headers for any RESTful requests
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		// old version headers (but work)
		// cont.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		// cont.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		// cont.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Max-Age", "86400")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Length")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS" {
			fmt.Println("OPTIONS")
			c.AbortWithStatus(200)
		} else {
			c.Next()
		}
	}
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
	// add headers middleware
	router.Use(CORSMiddleware())

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
