package conf

import (
	//"errors"
	"time"

	"gopkg.in/mgo.v2"
	//"os"
)

type DB string

const (
	SITE_NAME      string = "dvi"
	DEFAULT_LIMIT  int    = 10
	MAX_LIMIT      int    = 1000
	MAX_POST_CHARS int    = 1000
	MODE           string = "debug"
	SERVER_PORT    string = "8080"
)

const (
	EventTTLAfterEnd time.Duration = 1 * time.Second
	StdEventTTL      time.Duration = 20 * time.Minute
)

const (
	CountRndEvents int = 1000
)

const (
	mongoDB   string = "mongo"
	easyMongo string = "emongo"
	mySQL     string = "mysql"
	IsDrop    bool   = true
)

//mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
const (
	host         string = "localhost:27017"
	ThisDatabase string = "test"
	ThisUsername string = "jaime"
	ThisPassword string = "123456789"
	ThisPort     string = "27017"
)

const (
	UseDB string = mongoDB
)

func Init() {
}

func ConfigMongoDB() *mgo.DialInfo {

	info := &mgo.DialInfo{
		Addrs:    []string{host},
		Timeout:  60 * time.Second,
		Database: ThisDatabase,
		Username: ThisUsername,
		Password: ThisPassword,
	}
	return info
}
