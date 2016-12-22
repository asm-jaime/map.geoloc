package controllers

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

// Server for you
type Server struct{}

func testData(c *gin.Context) {
	c.String(200, "test data")
}

// NewEngine return the new gin server
func (server *Server) NewEngine(thisPort string) {

	// thisEng := gin.New()
	router := gin.Default()
	router.Use(static.Serve("/", static.LocalFile("./public", true)))
	// simple group: v1
	v1 := router.Group("/v1")
	{
		v1.POST("/test", testData)
	}

	// simple group: v2
	v2 := router.Group("/v2")
	{
		v2.POST("/test", testData)
	}

	router.Run(":" + thisPort)

}
