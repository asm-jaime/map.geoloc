package ctgeos

import (
	"fmt"
	"net/http"
	"strings"

	"golang.org/x/oauth2"

	"dvij.geoloc/conf"
	md "dvij.geoloc/mdgeos"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

// ========== global vars, what should be set to context

type Vars struct {
	geoState md.GeoState
}

// ========== middlewares

func MiddleVars(vars *Vars) gin.HandlerFunc { // {{{
	return func(c *gin.Context) {
		c.Set("vars", vars)
		c.Next()
	}
} // }}}

func MiddleDB(mongo *md.MongoDB) gin.HandlerFunc { // {{{
	return func(c *gin.Context) {
		err := mongo.SetSession()
		if err != nil {
			c.Abort()
		} else {
			c.Set("mongo", mongo)
			c.Next()
		}
	}
} // }}}

func MiddleAuth(oauth *oauth2.Config) gin.HandlerFunc { // {{{
	return func(c *gin.Context) {
		session := sessions.Default(c)
		v := session.Get("user-id")
		if v == nil {
			c.JSON(http.StatusUnauthorized, gin.H{"status": "unauthorized"})
			c.Abort()
		}
		c.Set("oauth", oauth)
		c.Next()
	}
} // }}}

func MiddleCORS() gin.HandlerFunc { // {{{
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

func MiddleNoRoute(c *gin.Context) { // {{{
	path := strings.Split(c.Request.URL.Path, "/")
	if (path[1] != "") && (path[1] == "api") {
		c.JSON(http.StatusNotFound, gin.H{"msg": "route not found", "body": nil})
	} else {
		fmt.Println("index")
		c.HTML(http.StatusOK, "index.html", "")
	}
} // }}}

// ========== init server

func NewRouter(vars *Vars, mongo *md.MongoDB, oauth *oauth2.Config, config *conf.ServerConfig) *gin.Engine {
	router := gin.Default()
	// support sessions
	store := sessions.NewCookieStore([]byte(md.RandToken(64)))
	store.Options(sessions.Options{
		Path:   "/",
		MaxAge: 86400 * 7,
	})
	// router
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(sessions.Sessions("goquestsession", store))
	// headers middleware
	router.Use(MiddleCORS())
	router.Use(MiddleDB(mongo))

	// frontend
	router.Use(static.Serve("/", static.LocalFile(config.StaticFolder, true)))
	router.LoadHTMLGlob(config.StaticFolder + "/index.html")
	// set api routes
	api := router.Group("api")
	{
		v1 := api.Group("v1")
		{
			user := v1.Group("users")
			{
				user.GET("", GetUser)
				user.POST("", PostUser)
				user.PUT("", PutUser)
				user.DELETE("", DelUser)

				user.GET("/all", GetUsers)
			}
			event := v1.Group("events")
			{
				event.GET("", GetEvent)
				event.POST("", PostEvent)
				event.PUT("", PutEvent)
				event.DELETE("", DelEvent)

				event.GET("/all", GetEvents)
			}
			group := v1.Group("groups")
			{
				group.GET("", GetGroup)
				group.POST("", PostGroup)
				group.PUT("", PutGroup)
				group.DELETE("", DelGroup)

				group.GET("/all", GetGroups)
			}
			point := v1.Group("points")
			point.Use(MiddleVars(vars))
			{
				point.GET("", GetLoc)
				point.POST("", PostLoc)
				point.PUT("", PutLoc)
				point.DELETE("", DelLoc)

				point.POST("/geoevent", PostGeoEvent)

				point.GET("/all", GetLocs)
				point.GET("/rnd", GetRndLoc)
				point.GET("/near", GetNearLoc)
				point.GET("/filter", GetFilterLoc)
				point.POST("/state", PostLocToGeoState)
			}
			auth := v1.Group("auth")
			{
				auth.GET("/login", LoginHandler)
				auth.GET("/auth", AuthHandler)
			}
			lock := v1.Group("/lock")
			{
				lock.Use(MiddleAuth(oauth))
				lock.GET("", GetLocs)
			}
		}
	}
	router.NoRoute(MiddleNoRoute)

	return router
}

func InitDB() (err error) { // {{{
	mongo := md.MongoDB{}
	mongo.SetDefault()
	err = mongo.SetSession()
	if err != nil {
		return err
	}
	defer mongo.Session.Close()

	err = mongo.Drop()
	if err != nil {
		return err
	}
	err = mongo.Init()
	if err != nil {
		return err
	}
	err = mongo.FillRnd(100)
	if err != nil {
		return err
	}

	return err
} // }}}

func Start(args []string) (err error) { // {{{
	// init config
	config := conf.ServerConfig{}
	config.SetDefault()
	mongo := md.MongoDB{}
	mongo.SetDefault()

	// the only global state with no context
	vars := Vars{geoState: *md.NewGeoState()}
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
	if len(args) > 6 { // set name of keyfile
		config.StaticFolder = args[6]
	}
	err = config.Cred.SetFromFile(config.KeyFile)
	if err != nil {
		fmt.Println(err)
	}

	// init oauth config
	coauth := oauth2.Config{
		ClientID:     config.Cred.Cid,
		ClientSecret: config.Cred.Csecret,
		RedirectURL:  "http://" + config.Host + ":" + config.Port + "/auth",
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
			// scope: https://developers.google.com/identity/protocols/googlescopes#google_sign-in
		},
	}

	// info
	fmt.Println("---------------")
	fmt.Println("Selected port: " + config.Port)
	fmt.Println("Selected host: " + config.Host)
	fmt.Println("Selected filekey: " + config.KeyFile)
	fmt.Println("Selected folder: " + config.StaticFolder)
	fmt.Println("---------------")

	// star server
	router := NewRouter(&vars, &mongo, &coauth, &config)
	router.Run(":" + config.Port)
	return err
} // }}}
