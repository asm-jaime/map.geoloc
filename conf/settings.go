package conf

import (
	//"errors"
	"encoding/json"
	"io/ioutil"
	"time"

	"gopkg.in/mgo.v2"
	//"os"
)

// ========== server params {{{

// ServerConfig can be set from command line
type ServerConfig struct {
	Host         string
	Port         string
	IsProduction bool
}

var DefaultServerConfig *ServerConfig = &ServerConfig{
	Host:         "localhost",
	Port:         "8080",
	IsProduction: false,
}

func (config *ServerConfig) SetConfig() {
	config.Host = DefaultServerConfig.Host
	config.Port = DefaultServerConfig.Port
	config.IsProduction = DefaultServerConfig.IsProduction
}

// ========== server params }}}

// ========== keys {{{
// KeysConfig all keys for any services (pimary google/twitter/vk/..)
type KeysConfig struct {
	Cid     string `json:"cid"`
	Csecret string `json:"csecret"`
}

var DefaultKeysConfig *KeysConfig = &KeysConfig{
	Cid:     "295529031882-ap6njd8e8p0bmggmvkb7t0iflhcetjn1.apps.googleusercontent.com",
	Csecret: "ICiVhKO51UxbNfIQVR7WudxH",
}

const KeysConfigFile string = "keys/clientid.google.json"

func (config *KeysConfig) SetConfig() *APIError {
	file, err := ioutil.ReadFile(KeysConfigFile)
	if err != nil {
		config.Cid = DefaultKeysConfig.Cid
		config.Csecret = DefaultKeysConfig.Csecret
		return NewAPIError(err)
	}

	err = json.Unmarshal(file, &config)
	if err != nil {
		config.Cid = DefaultKeysConfig.Cid
		config.Csecret = DefaultKeysConfig.Csecret
		return NewAPIError(err)
	}
	return NewAPIError(err)
}

// ========== keys }}}

// ========== cert params {{{
const (
	CertName string = "cert.pem"
	KeyName  string = "key.pem"
)

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

// ========== end MongoDB section }}}
