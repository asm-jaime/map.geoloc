package models

import (
	"fmt"
	"os"
	"testing"

	"dvij.geoloc/conf"
)

func TestMakeHTTPSCertV1(testT *testing.T) {
	fmt.Print("\nstart test make https cert...\n")
	var err error

	apiError := MakeHTTPSCertV1(conf.CertName, conf.KeyName, conf.HostName)
	if apiError != nil {
		testT.Error("MakeHttpsCertV1 cert files, got error: ", apiError)
	}
	if _, err = os.Stat(conf.CertName); err != nil {
		if os.IsNotExist(err) {
			testT.Error("MakeHttpsCertV1 "+conf.CertName+" files does not exitst, error :", err)
		}
	}
	if _, err = os.Stat(conf.KeyName); err != nil {
		if os.IsNotExist(err) {
			testT.Error("MakeHttpsCertV1 "+conf.KeyName+" files does not exitst, error :", err)
		}
	}
}
