package conf

import (
	//"errors"
	"Backlun/back/conf"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"time"

	"github.com/kabukky/httpscerts"
	//"os"
)

// ========== server params {{{

// ServerConfig can be set from command line
type ServerConfig struct {
	Host         string
	Port         string
	IsProduction bool
	KeyFile      string
	Cred         Credentials
}

func (config *ServerConfig) SetDefault() {
	config.Host = "localhost"
	config.Port = "8080"
	config.IsProduction = false
	config.Cred.Cid = "295529031882-ap6njd8e8p0bmggmvkb7t0iflhcetjn1.apps.googleusercontent.com"
	config.Cred.Csecret = "ICiVhKO51UxbNfIQVR7WudxH"
	config.KeyFile = "keys/clientid.google.json"
}

// ========== server params }}}

// ========== keys {{{

// Credentials stored a google cred.
type Credentials struct {
	Cid     string `json:"cid"`
	Csecret string `json:"csecret"`
}

func (cred *Credentials) SetFromFile(keyf string) *conf.ApiError {
	file, err := ioutil.ReadFile(keyf)
	if err != nil {
		return conf.NewApiError(err)
	}

	err = json.Unmarshal(file, &cred)
	if err != nil {
		return conf.NewApiError(err)
	}
	return conf.NewApiError(err)
}

// ========== keys }}}

// ========== cert params {{{
const (
	CertName string = "cert.pem"
	KeyName  string = "key.pem"
)

// MakeHTTPSCertV1 If cert files are not available, generate new ones.
func MakeHTTPSCertV1(nameCert string, nameKey string, hostName string) ApiError {
	err := httpscerts.Check(nameCert, nameKey)
	if err != nil {
		err = httpscerts.Generate(nameCert, nameKey, hostName)
		if err != nil {
			fmt.Print("Error: Couldn't create https certs.")
			return ErrHTTPSCert
		}
	}
	return nil
}

// ========== cert params }}}

// Sine ss
const (
	SiteName             string = "geoloc"
	DefaultLimit         int    = 10
	MaxLimits            int    = 1000
	MaxPostChars         int    = 1000
	Mode                 string = "debug"
	HTTPRouterServerPort string = "8080"
	EchoServerPort       string = "8081"
	GinServerPort        string = "8080"
)

// ========== tests params {{{
const (
	CountRndEvents int = 1000
)

// ========== end tests params }}}

// ========== MongoDB section {{{

// db
const (
	mongoDB    bool = false
	postgreSQL bool = true
	IsDrop     bool = true
)

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

func InitDataBase() {
	// thisDB := new(geoloc.DviMongoDB)

	// err := thisDB.Drop()
	// if err != nil {
	// fmt.Print(err)
	// }

	// err = thisDB.Init()
	// if err != nil {
	// fmt.Print(err)
	// }

	// err = thisDB.FillRnd(10)
	// if err != nil {
	// fmt.Print(err)
	// }
}

// ========== end MongoDB section }}}
