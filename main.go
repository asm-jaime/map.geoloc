package main

import (
	"dvijback/conf"
	"net/http"

	//"dvijback/models"
	//"dvijback/utils"

	//"fmt"
	//"github.com/julienschmidt/httprouter"
	//"github.com/rs/cors"
	//"net/http"
	echo "gopkg.in/labstack/echo.v1"
	mw "gopkg.in/labstack/echo.v1/middleware"
)

func hello(c *echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!\n")
}

func main() {
	//controllers.TestMe()
	//controllers.InitDataBase()

	//mux := http.NewServeMux()// {{{
	//mux.HandleFunc("/", models.LoadFewFromMongoDB)
	//this_cors := cors.New(cors.Options{
	//AllowedOrigins:   []string{"*"},
	//AllowCredentials: true,
	//})
	//handler := this_cors.Handler(mux)
	//http.ListenAndServe(":8080", handler)
	//router := httprouter.New()
	//router.GET("/hello/:name", controllers.Hello)
	//log.Fatal(http.ListenAndServe(":"+conf.SERVER_PORT, router))// }}}
	// Echo instance
	e := echo.New()
	e.Use(mw.Logger())
	e.Use(mw.Recover())
	e.Get("/", hello)
	e.Run(":" + conf.SERVER_PORT)

}
