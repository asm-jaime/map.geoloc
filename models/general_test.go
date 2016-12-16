package models

import (
	"fmt"
	"testing"

	"dvij.geoloc/conf"
)

func TestDbSession(test_t *testing.T) {
	this_session, api_error := DbSession(conf.MgoConfig())
	defer this_session.Close()
	fmt.Print("\na session:\n")
	fmt.Print(this_session)
	if api_error != nil {
		test_t.Error("error session : ", api_error)
	}
}
