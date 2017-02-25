package geoloc

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestFillGeoState(testT *testing.T) {
	const num = 2
	geost := NewGeoState()
	geost.SetRnd(num)
	fmt.Printf("\na geo point: %v\n", geost.Location)
	assert.Equal(testT, len(geost.Location), num, "len array should be equal num")
}
