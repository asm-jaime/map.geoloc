package geoloc

import (
	"fmt"
	"testing"
	"time"

	"dvij.geoloc/conf"
	"dvij.geoloc/models"
)

func TestDbSession(testT *testing.T) {
	thisSession, apiError := DbSession(conf.MgoConfig())
	defer thisSession.Close()
	fmt.Print("\na session:\n")
	fmt.Print(thisSession)
	if apiError != nil {
		testT.Error("error session : ", apiError)
	}
}

func TestInitStructureDataBase() {
	err := models.DropDataBase()
	err = models.InitStructureDataBase()
	err = models.StdFillDataBase(10)
	if err != nil {
		fmt.Print(err.Error())
	}
}

func TestInsertArrayEvents() {
	thisArray := models.MakeArrayEventsV1(4)
	err := models.InsertArrayEvents(thisArray)
	if err != nil {
		fmt.Print(err.Error())
	}
}

func TestMakeInterfaceEvents() {
	//thisArray := models.MakeInterfaceEvents(4)
	//fmt.Print(thisArray)
}

// func TestConnectDataBase() {
// thisSession := models.DbSession()
// defer thisSession.Close()
// fmt.Print(thisSession)
// }

func TestFillRnd(testT *testing.T) { // {{{
	//collection := session.DB(conf.MgoDatabase).C("events")
	thisEvents := NewEvents()
	start := time.Now()
	for i := 0; i < num; i++ {
		thisEvent.SetStdParam()
		*thisEvents = append(*thisEvents, *thisEvent)
	}
	elapsed := time.Since(start)
	fmt.Print('\n' + elapsed)

	fmt.Print('\n' + len(*thisEvents))
	//start = time.Now()
	//for i := 0; i < 10; i++ {
	//thisEvents.InsertEvents()
	//}
	//elapsed = time.Since(start)
	//fmt.Print('\n' + elapsed)
	return nil
} // }}}
