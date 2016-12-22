package conf

import (
	//"errors"
	"time"

	"gopkg.in/mgo.v2"
	//"os"
)

// #################### abstract params section {{{

// Sine ss
const (
	SiteName             string = "dvij_geoloc"
	HostName             string = "localhost"
	DefaultLimit         int    = 10
	MaxLimits            int    = 1000
	MaxPostChars         int    = 1000
	Mode                 string = "debug"
	HTTPRouterServerPort string = "8080"
	EchoServerPort       string = "8081"
	GinServerPort        string = "8080"
)

// db
const (
	mongoDB    bool = false
	postgreSQL bool = true
	IsDrop     bool = true
)

// #################### end of abstract section }}}

// #################### cert params {{{
const (
	CertName string = "cert.pem"
	KeyName  string = "key.pem"
)

// #################### cert params }}}

// #################### tests params {{{
const (
	CountRndEvents int = 1000
)

// #################### end tests params }}}

// #################### MongoDB section {{{

//mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
const (
	MgoHost     string = "localhost:27017"
	MgoPort     string = "27017"
	MgoDatabase string = "dvi_mgo"
	MgoUsername string = "jaime"
	MgoPassword string = "123456789"
)

// time live events
const (
	EventTTLAfterEnd time.Duration = 1 * time.Second
	StdEventTTL      time.Duration = 20 * time.Minute
)

// MgoConfig return all data of config for connect to mongoDB
func MgoConfig() *mgo.DialInfo {
	info := &mgo.DialInfo{
		Addrs:    []string{MgoHost},
		Timeout:  60 * time.Second,
		Database: MgoDatabase,
		Username: MgoUsername,
		Password: MgoPassword,
	}
	return info
}

// #################### end MongoDB section }}}
