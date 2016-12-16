package models

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
