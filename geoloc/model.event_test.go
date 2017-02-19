package geoloc

import (
	"fmt"
	"testing"

	"dvij.geoloc/models"

	"github.com/stretchr/testify/assert"
)

func TestMakeArrayEventsV1(testT *testing.T) {
	var thisResults *DviEvents

	thisResults = MakeArrayEventsV1(10)
	fmt.Print("\na event:\n")
	fmt.Print((*thisResults)[0])
	assert.Equal(testT, len(*thisResults), 10, "10 array should be equal 10")
}

func TestInsertDviEvents() {
	thisArray := models.MakeArrayEventsV1(24)
	err := models.InsertDviEvents(thisArray)
	if err != nil {
		fmt.Print(err.Error())
	}
}

// start := time.Now()
// elapsed := time.Since(start)
// fmt.Print('\n' + elapsed)
// fmt.Print(len(results))
