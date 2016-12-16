package models

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestMakeArrayEventsV1(test_t *testing.T) {
	var this_results *DviEvents

	this_results = MakeArrayEventsV1(10)
	fmt.Print("\na event:\n")
	fmt.Print((*this_results)[0])
	assert.Equal(test_t, len(*this_results), 10, "10 array should be equal 10")
}
