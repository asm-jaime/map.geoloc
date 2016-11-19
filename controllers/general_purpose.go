package controllers

import (
	"dvij.geoloc/conf"
	"dvij.geoloc/models"
	"fmt"
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
