package main

import (
	"flag"
	"log"
	"os"
)

type flags struct {
	start *string
}

func main() {
	// processing console arguments
	fs := flags{}
	fs.start = flag.String("start", "geoloc", "start geoloc service")
	flag.Parse()

	switch *fs.start {
	case "geoloc":
		m := mongoDB{}
		m.setDefault()
		port := os.Getenv("SERVER_PORT")

		o2 := getOauth2()
		router := router(&m, &o2)
		router.Run(":" + port)
	case "init":
		err := initDB()
		if err != nil {
			log.Fatal(err)
		} else {
			log.Println("init db successful complete")
		}
	}
}

func initDB() (err error) {
	mongo := mongoDB{}
	mongo.setDefault()
	defer mongo.Session.Close()
	err = mongo.init()
	return err
}
