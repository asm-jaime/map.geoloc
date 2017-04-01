package geoloc

import (
	"fmt"
	"net/http"
	"strings"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"

	"dvij.geoloc/conf"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

// ========== declaration of configs

// Server for you
type Server struct{}

// configure vars
var config *conf.ServerConfig
var confTemp *oauth2.Config
var database *MongoDB
var msgState *conf.MsgState
var geoState *GeoState
var checkPoint *GeoPoint

// ========== middlewares

func AuthorizeRequest() gin.HandlerFunc { // {{{
	return func(thisContext *gin.Context) {
		session := sessions.Default(thisContext)
		v := session.Get("user-id")
		if v == nil {
			thisContext.JSON(http.StatusUnauthorized, gin.H{"status": "unauthorized"})
			thisContext.Abort()
		}
		thisContext.Next()
	}
} // }}}

func CORSMiddleware() gin.HandlerFunc { // {{{
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
} // }}}

func noRoute(c *gin.Context) { // {{{
	path := strings.Split(c.Request.URL.Path, "/")
	if (path[1] != "") && (path[1] == "api") {
		c.JSON(http.StatusNotFound, msgState.Errors[http.StatusNotFound])
	} else {
		fmt.Println("index")
		c.HTML(http.StatusOK, "index.html", "")
		// c.Redirect(http.StatusOK, "/")
	}
} // }}}

// ========== init server

// NewEngine return the new gin server
func (server *Server) NewEngine(port string) {
	router := gin.Default()

	// support sessions
	store := sessions.NewCookieStore([]byte(RandToken(64)))
	store.Options(sessions.Options{
		Path:   "/",
		MaxAge: 86400 * 7,
	})

	// router
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(sessions.Sessions("goquestsession", store))
	// headers middleware
	router.Use(CORSMiddleware())

	// frontend
	router.Use(static.Serve("/", static.LocalFile("./public", true)))
	router.LoadHTMLGlob("./public/index.html")

	// set api routes
	api := router.Group("api")
	{
		// api v1
		v1 := api.Group("v1")
		{
			// auth
			auth := v1.Group("auth")
			{
				auth.GET("/login", LoginHandler)
				auth.GET("/auth", AuthHandler)
			}
			// points
			point := v1.Group("points")
			{
				// random point
				point.GET("/random", GetRndPoint)
				// point
				point.GET("/", GetPoints)
				point.POST("/", PostPoint)
				// point.PUT("/", PutPoint)
				// point.DELETE("/", DeletePoint)
			}
			// events
			event := v1.Group("events")
			{
				event.GET("/", GetEvents)
			}
			// users
			user := v1.Group("users")
			{
				user.GET("/:id", GetUser)
			}
			//  group: here is API for authorized query
			lock := v1.Group("/lock")
			lock.Use(AuthorizeRequest())
			{
				lock.GET("/", lockTest)
			}
		}
	}

	// no route, bad url
	router.NoRoute(noRoute)
	// start server
	router.Run(":" + port)
}

func Start(args []string) (err error) { // {{{
	// init config
	config := conf.ServerConfig{}
	config.SetDefault()

	msgState = conf.NewMsgState()
	msgState.SetErrors()
	geoState = NewGeoState()

	database = &MongoDB{}
	database.config.SetDefault()

	// processing console arguments
	if len(args) > 3 { // set port
		config.Port = args[3]
	}
	if len(args) > 4 { // set host
		config.Host = args[4]
	}
	if len(args) > 5 { // set name of keyfile
		config.KeyFile = args[5]
	}
	err = config.Cred.SetFromFile(config.KeyFile)
	if err != nil {
		fmt.Println(err)
	}

	// init oauth config
	confTemp = &oauth2.Config{
		ClientID:     config.Cred.Cid,
		ClientSecret: config.Cred.Csecret,
		RedirectURL:  "http://" + config.Host + ":" + config.Port + "/auth",
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
			// scope: https://developers.google.com/identity/protocols/googlescopes#google_sign-in
		},
		Endpoint: google.Endpoint,
	}

	// info
	fmt.Println("---------------")
	fmt.Println("Selected port: " + config.Port)
	fmt.Println("Selected host: " + config.Host)
	fmt.Println("Selected filekey: " + config.KeyFile)
	fmt.Println("---------------")

	// err = database.FillRnd(5)
	// if err != nil {
	// fmt.Printf("err on filling: %v", err)
	// }

	// events, err := database.GetAllEvents()
	// fmt.Printf("ev: %v\n", events)

	// points, err := database.GetAllPoints()
	// fmt.Printf("pt: %v\n", points)

	// star server
	server := new(Server)
	server.NewEngine(config.Port)

	return err
} // }}}
