package psql_test

import (
	"dvij_geoloc/conf"
	"fmt"
	"gopkg.in/pg.v4"
	"testing"
)

//type psqlTest{
//}

//(test *psqlTest)

func TestConnect(t *testing.T) {
	fmt.Print("start test connection to postgreSQL...\n")
	this_config := conf.PsqlConfig()
	db := pg.Connect(this_config)
	err := db.Close()
	if err != nil {
            fmt.Print("error: ")
		fmt.Println(err)
	}
}

// vim:ts=4:sw=4:et
