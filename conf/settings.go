package conf

import (
	//"errors"
	"time"

	"gopkg.in/mgo.v2"
	"gopkg.in/pg.v4"
	//"os"
)

// abstract
const (
	SITE_NAME      string = "dvij_geoloc"
	DEFAULT_LIMIT  int    = 10
	MAX_LIMIT      int    = 1000
	MAX_POST_CHARS int    = 1000
	MODE           string = "debug"
	SERVER_PORT    string = "8080"
)

// db
const (
	mongoDB    bool = false
	postgreSQL bool = true
	IsDrop     bool = true
)

//MongoDB
//mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
const (
	MgoHost     string = "localhost:27017"
	MgoPort     string = "27017"
	MgoDatabase string = "dvi_mgo"
	MgoUsername string = "jaime"
	MgoPassword string = "123456789"
)

// db, err := sql.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=verify-full")
// dbname - The name of the database to connect to
// user - The user to sign in as
// password - The user's password
// host - The host to connect to. Values that start with / are for unix domain sockets. (default is localhost)
// port - The port to bind to. (default is 5432)
// sslmode - Whether or not to use SSL (default is require, this is not the default for libpq)
// fallback_application_name - An application_name to fall back to if one isn't provided.
// connect_timeout - Maximum wait for connection, in seconds. Zero or not specified means wait indefinitely.
// sslcert - Cert file location. The file must contain PEM encoded data.
// sslkey - Key file location. The file must contain PEM encoded data.
// sslrootcert - The location of the root certificate file. The file must contain PEM encoded data.
// disable - No SSL
// require - Always SSL (skip verification)
// verify-ca - Always SSL (verify that the certificate presented by the server was signed by a trusted CA)
// verify-full - Always SSL (verify that the certification presented by the server was signed by a trusted CA and the server host name matches the one in the certificate)
const (
	PsqlHost     string = "localhost:5432"
	PsqlPort     string = "5432"
	PsqlDatabase string = "dvi_post"
	PsqlUsername string = "dvijuha"
	PsqlPassword string = "dviproject22"
)

// tests
const (
	CountRndEvents int = 1000
)

// time live events
const (
	EventTTLAfterEnd time.Duration = 1 * time.Second
	StdEventTTL      time.Duration = 20 * time.Minute
)

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

func PsqlConfig() *pg.Options {
	//pg.Options.
	info := &pg.Options{
		Addr:     PsqlHost,
		User:     PsqlUsername,
		Password: PsqlPassword,
		Database: PsqlDatabase,
	}
	return info
}
