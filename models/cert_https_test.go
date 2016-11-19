package models

import (
	"fmt"
	"os"
	"testing"

	"dvij.geoloc/conf"
)

func TestMakeHttpsCertV1(test_t *testing.T) {
	fmt.Print("\nstart test make https cert...\n")
	var err error

	apiErr := MakeHttpsCertV1(conf.CertName, conf.KeyName, conf.HostName)
	if apiErr != nil {
		test_t.Error("MakeHttpsCertV1 cert files, got error: ", apiErr)
	}
	if _, err = os.Stat(conf.CertName); err != nil {
		if os.IsNotExist(err) {
			test_t.Error("MakeHttpsCertV1 "+conf.CertName+" files does not exitst, error :", err)
		}
	}
	if _, err = os.Stat(conf.KeyName); err != nil {
		if os.IsNotExist(err) {
			test_t.Error("MakeHttpsCertV1 "+conf.KeyName+" files does not exitst, error :", err)
		}
	}
}
