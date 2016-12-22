package controllers

import (
	"fmt"

	"dvij.geoloc/conf"
	"dvij.geoloc/models"
)

// MakeHTTPSCert will make cert with configs
func MakeHTTPSCert() {
	err := models.MakeHTTPSCertV1(conf.CertName, conf.KeyName, conf.HostName)
	if err != nil {
		fmt.Printf("\nerror, cant make a cert.. error \n")
		fmt.Print(err)
	}
}
