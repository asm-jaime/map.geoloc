package models

import (
	"fmt"
	"testing"

	"dvij.geoloc/conf"
	"gopkg.in/pg.v4"
)

func TestConnect(t *testing.T) {
	fmt.Print("\nstart test connection to postgreSQL...\n")
	this_config := conf.PsqlConfig()
	db := pg.Connect(this_config)
	err := db.Close()
	if err != nil {
		fmt.Print("error: ")
		fmt.Println(err)
	}
}

// vim:ts=4:sw=4:et
