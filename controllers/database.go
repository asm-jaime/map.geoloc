package controllers

import (
	"fmt"

	"dvij.geoloc/models"
	//"net/http"
)

// InitDataBase first time DB initialisation
func InitDataBase() {
	thisDB := new(models.DviMongoDB)

	err := thisDB.Drop()
	if err != nil {
		fmt.Print(err)
	}

	err = thisDB.Init()
	if err != nil {
		fmt.Print(err)
	}

	err = thisDB.FillRnd(10)
	if err != nil {
		fmt.Print(err)
	}
}
