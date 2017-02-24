package geoloc

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

// Test NewGeoState
// Test FillRnd
func TestNewGeoState(testT *testing.T) {
	thisGeoState = NewGeoState()
	thisGeoState.FillRnd(10)
	fmt.Print("\na geo point:\n")
	fmt.Print((*thisGeoState)[0])
	assert.Equal(testT, len(*thisGeoState), 10, "10 array should be equal 10")
}

func TestMakeArrayEventsV1(testT *testing.T) {
	var events *DviEvents

	events = MakeArrayEventsV1(10)
	fmt.Print("\na event:\n")
	fmt.Print((*events)[0])
	assert.Equal(testT, len(*events), 10, "10 array should be equal 10")
}

func TestInsertDviEvents() {
	events := MakeArrayEventsV1(24)
	err := InsertDviEvents(events)
	if err != nil {
		fmt.Print(err.Error())
	}
}

// start := time.Now()
// elapsed := time.Since(start)
// fmt.Print('\n' + elapsed)
// fmt.Print(len(results))
