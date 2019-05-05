package conf

import (
	//"errors"
	"encoding/json"
	"io/ioutil"

	"github.com/kabukky/httpscerts"
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
	StaticFolder string
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
	config.Port = "8081"

	config.IsProduction = false
	config.KeyFile = "conf/clientid.google.json"
	config.StaticFolder = "./public"
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
func MakeHTTPSCertV1(nameCert string, nameKey string, hostName string) (err error) {
	err = httpscerts.Check(nameCert, nameKey)
	if err != nil {
		err = httpscerts.Generate(nameCert, nameKey, hostName)
		if err != nil {
			return err
		}
	}
	return err
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
