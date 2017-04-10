package mdgeos

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func _TestFillGeoState(testT *testing.T) {
	const num = 2
	geost := NewGeoState()
	geost.SetRnd(num)
	fmt.Printf("\na geo point: %v\n", geost.Locations)
	assert.Equal(testT, len(geost.Locations), num, "len array should be equal num")
}
