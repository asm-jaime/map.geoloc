package controllers

import (
	"fmt"
	"net/http"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"

	"dvij.geoloc/conf"
	"dvij.geoloc/models"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

// Server for you
type Server struct{}

var confTemp *oauth2.Config

func testData(cont *gin.Context) {
	cont.JSON(200, gin.H{"message: ": "test data"})
}

// ========== middlevares {{{
// AuthorizeRequest is used to authorize a request for a certain end-point group.
func AuthorizeRequest() gin.HandlerFunc {
	return func(thisContext *gin.Context) {
		session := sessions.Default(thisContext)
		v := session.Get("user-id")
		if v == nil {
			thisContext.JSON(http.StatusUnauthorized, gin.H{"status": "unauthorized"})
			thisContext.Abort()
		}
		thisContext.Next()
	}
}

// CORSMiddleware middleware witch headers for any RESTful requests
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
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

// ========== middlevares }}}

// NewEngine return the new gin server {{{
func (server *Server) NewEngine(port string) {
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

	router.Run(":" + port)
} // }}}

func Start(args []string) {
	// init server config
	server := conf.ServerConfig{}
	server.SetConfig()

	// init oauth keys
	cred := conf.KeysConfig{}
	err := cred.SetConfig()
	if err.Code != 0 {
		fmt.Print(err.Error())
	}

	// processing console arguments
	if len(args) > 3 { // set port
		server.Port = args[3]
	} else if len(args) > 4 { // set host
		server.Host = args[4]
	}

	// init oauth config
	confTemp = &oauth2.Config{
		ClientID:     cred.Cid,
		ClientSecret: cred.Csecret,
		RedirectURL:  "http://" + server.Host + ":" + server.Port + "/auth",
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
			// your own scope: https://developers.google.com/identity/protocols/googlescopes#google_sign-in
		},
		Endpoint: google.Endpoint,
	}

	// info
	fmt.Println("---------------")
	fmt.Println("Selected port: " + server.Port)
	fmt.Println("Selected host: " + server.Host)
	fmt.Println("---------------")

	// star server
	thisServer := new(Server)
	thisServer.NewEngine(server.Port)
}
