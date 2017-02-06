package controllers

import (
	"fmt"

	"dvij.geoloc/models"
)

// MakeHTTPSCert will make cert with configs
func MakeHTTPSCert(CertName string, KeyName string, HostName string) {
	err := models.MakeHTTPSCertV1(CertName, KeyName, HostName)
	if err != nil {
		fmt.Printf("\nerror, cant make a cert.. error \n")
		fmt.Print(err)
	}
}
