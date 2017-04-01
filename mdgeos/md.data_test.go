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
	fmt.Printf("\na geo point: %v\n", geost.Points)
	assert.Equal(testT, len(geost.Points), num, "len array should be equal num")
}
