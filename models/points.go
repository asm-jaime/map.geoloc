package models

import (
	//"encoding/binary"
	"encoding/json"
	"fmt"
	"io"
	"math/rand"
	"net/http"
	"sync"
	//"time"
)

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

// GeoPoint for example {lat: 1.011111, lng: 1.0000450}
type GeoPoint struct {
	Type string  `json:"-"`
	Lat  float64 `json:"lat"`
	Lng  float64 `json:"lng"`
}

// GeoState is map(array) of points
type GeoState struct {
	Location map[string]GeoPoint `json:"location"`
	sync.RWMutex
}

func rndStr(n int) string { // {{{
	rndStr := make([]rune, n)
	for i := range rndStr {
		rndStr[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(rndStr)
} // }}}

// NewGeoState make new empty state
func NewGeoState() *GeoState { // {{{
	return &GeoState{
		Location: make(map[string]GeoPoint),
	}
} // }}}

// Add new point with token
func (thisGeost *GeoState) Add(thisToken string, thisPoint *GeoPoint) { // {{{
	thisGeost.Lock()
	defer thisGeost.Unlock()
	thisGeost.Location[thisToken] = *thisPoint
} // }}}

// Clear state
func (thisGeost *GeoState) Clear() { // {{{
	thisGeost.Lock()
	defer thisGeost.Unlock()
	thisGeost.Location = make(map[string]GeoPoint)
} // }}}

// Len return lenght state
func (thisGeost *GeoState) Len() int { // {{{
	return len(thisGeost.Location)
} // }}}

// PrintPoints print poinsts to a dafault stream
func (thisGeost *GeoState) PrintPoints() { // {{{
	fmt.Print(thisGeost)
} // }}}

// FillRnd fill GeoState the n points
func (thisGeost *GeoState) FillRnd(n int) { // {{{
	thisGeost.Lock()
	defer thisGeost.Unlock()
	var thisToken string
	for thisN := 0; thisN < n; thisN++ {
		thisToken = rndStr(4)
		thisGeost.Location[thisToken] = GeoPoint{
			Lat: (rand.Float64() * 5) + 5,
			Lng: (rand.Float64() * 5) + 5}
	}
} // }}}

// AddFromJSON add points to this GeoState
func (thisGeost *GeoState) AddFromJSON(thisJSON []byte) { // {{{
	thisGeost.Lock()
	defer thisGeost.Unlock()
	json.Unmarshal(thisJSON, &thisGeost.Location)
	thisGeost.PrintPoints()
} // }}}

// AddJSONFromIO add form io
func (thisGeost *GeoState) AddJSONFromIO(thisJSON io.Reader) (err error) {
	thisGeost.Lock()
	defer thisGeost.Unlock()
	err = json.NewDecoder(thisJSON).Decode(&thisGeost.Location)
	return err
}

// AddJSONToIO add to io
func (thisGeost *GeoState) AddJSONToIO(thisWriter *http.ResponseWriter) (err error) {
	thisGeost.Lock()
	defer thisGeost.Unlock()
	err = json.NewEncoder(*thisWriter).Encode(thisGeost.Location)
	return err
}
