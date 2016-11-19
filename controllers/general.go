package controllers

import (
	"fmt"

	"dvij.geoloc/conf"
	"dvij.geoloc/models"
	//"net/http"
)

func InitDataBase() {
	err := models.DropDataBase()
	if err != nil {
		fmt.Print(err)
	}
	err = models.InitStructureDataBase()
	if err != nil {
		fmt.Print(err)
	}
	err = models.StdFillDataBase(conf.CountRndEvents)
	fmt.Print(err)
	if err != nil {
		fmt.Print(err)
	}
}
