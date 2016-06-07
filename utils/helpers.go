package utils

import (
	"dvijback/conf"
	"fmt"
	"gopkg.in/mgo.v2"
	"os"
)

func NewDbSession() *mgo.Session {
	this_config := conf.ConfigMongoDB()
	session, err := mgo.DialWithInfo(this_config)
	if err != nil {
		fmt.Print("error connect to DB")
		os.Exit(1)
	}
	return session
}

func OldDbSession() *mgo.Session {
	session, err := mgo.Dial(conf.ThisDatabase)
	if err != nil {
		fmt.Print("error connect to DB")
		os.Exit(1)
	}
	return session
}
