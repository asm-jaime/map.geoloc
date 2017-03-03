package conf

import (
	//"errors"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"time"

	"github.com/kabukky/httpscerts"
	mgo "gopkg.in/mgo.v2"
	//"os"
)

// ========== server params {{{

// ServerConfig can be set from command line
type ServerConfig struct {
	SiteName     string
	MaxPostChars int
	DefaultLimit int
	MaxLimits    int
	Host         string
	Port         string
	KeyFile      string
	IsProduction bool
	Cred         Credentials
}

func (config *ServerConfig) SetDefault() {
	config.SiteName = "geoloc"
	config.MaxPostChars = 1000
	//timing
	config.DefaultLimit = 10
	config.MaxLimits = 1000
	// adress
	config.Host = "localhost"
	config.Port = "8080"

	config.IsProduction = false
	config.KeyFile = "conf/clientid.google.json"
	config.Cred.Cid = "295529031882-ap6njd8e8p0bmggmvkb7t0iflhcetjn1.apps.googleusercontent.com"
	config.Cred.Csecret = "ICiVhKO51UxbNfIQVR7WudxH"
}

// }}}

// ========== keys/certs {{{

const (
	CertName string = "cert.pem"
	KeyName  string = "key.pem"
)

// MakeHTTPSCertV1 If cert files are not available, generate new ones.
func MakeHTTPSCertV1(nameCert string, nameKey string, hostName string) *ApiError {
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

// Credentials stored a google cred.
type Credentials struct {
	Cid     string `json:"cid"`
	Csecret string `json:"csecret"`
}

func (cred *Credentials) SetFromFile(keyf string) (err error) {
	file, err := ioutil.ReadFile(keyf)
	if err != nil {
		return err
	}

	err = json.Unmarshal(file, &cred)
	if err != nil {
		return err
	}
	return err
}

// }}}

// ========== MongoDB section {{{

// DbConfig can be set
type DbConfig struct {
	Host             string
	Port             string
	Addrs            string
	Database         string
	Username         string
	Password         string
	EventTTLAfterEnd time.Duration
	StdEventTTL      time.Duration
	Info             *mgo.DialInfo
}

func (config *DbConfig) SetDefault() {
	// host database params
	config.Port = "27017"
	config.Host = "localhost"
	config.Addrs = config.Host + ":" + config.Port
	// database
	config.Database = "dviMongo"
	// user for requests
	config.Username = "jaime"
	config.Password = "123456789"
	// time live events
	config.EventTTLAfterEnd = 1 * time.Second
	config.StdEventTTL = 20 * time.Minute
	config.Info = &mgo.DialInfo{
		Addrs:    []string{config.Addrs},
		Timeout:  60 * time.Second,
		Database: config.Database,
		Username: config.Username,
		Password: config.Password,
	}
}

//mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]

// MgoConfig return all data of config for connect to mongoDB
func (config *DbConfig) MgoConfig() *mgo.DialInfo {
	info := &mgo.DialInfo{
		Addrs:    []string{config.Addrs},
		Timeout:  60 * time.Second,
		Database: config.Database,
		Username: config.Username,
		Password: config.Password,
	}
	return info
}

// }}}
