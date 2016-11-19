package controllers

import (
	"fmt"

	"dvij.geoloc/conf"
	"dvij.geoloc/models"
)

func MakeHttpsCert() {
	err := models.MakeHttpsCertV1(conf.CertName, conf.KeyName, conf.HostName)
	if err != nil {
		fmt.Printf("\nerror, cant make a cert.. error %d\n", err)
	}
}
