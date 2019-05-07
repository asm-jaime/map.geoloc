package main

import (
	"math"
	"time"

	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// ========== data section

type tokenReq struct {
	Token string `form:"token" binding:"required" bson:"token"`
}

type distanceReq struct {
	Distance float64 `form:"distance" binding:"required"`
}

// ========== Users

type (
	geoUser struct {
		ID     bson.ObjectId `form:"_id" bson:"_id,omitempty"`
		Name   string        `form:"name" bson:"name,omitempty"`
		Text   string        `form:"text" bson:"text,omitempty"`
		Tags   []string      `form:"tags" bson:"tags,omitempty"`
		Email  string        `form:"email" bson:"email,omitempty"`
		Events []mgo.DBRef   `form:"events" bson:"events,omitempty"`
	}
)

// ========== Events

// Event struct for processing events
type (
	geoEvent struct {
		ID        bson.ObjectId `form:"_id" bson:"_id,omitempty"`
		Name      string        `form:"name" bson:"name,omitempty"`
		Text      string        `form:"text" bson:"text,omitempty"`
		Tags      []string      `form:"tags" bson:"tags,omitempty"`
		TTLEvent  time.Time     `form:"ttl" bson:"ttl,omitempty"`
		Timestamp time.Time     `form:"timestamp" bson:"timestamp,omitempty"`
		Users     []mgo.DBRef   `form:"users" bson:"users,omitempty"`
	}
)

// ========== locs

// id GeoLocation should be id user/event
type (
	geoObject struct {
		Type        string     `json:"type,omitempty"`
		Coordinates [2]float64 `json:"coordinates,omitempty"`
	}

	geoLocation struct {
		ID       bson.ObjectId `form:"_id" json:"_id,omitempty" bson:"_id,omitempty"`
		TObject  string        `form:"tobject" json:"tobject,omitempty" bson:"tobject,omitempty"`
		Location geoObject     `form:"location" json:"location,omitempty" bson:"location,omitempty"`
	}

	respondID struct {
		ID bson.ObjectId `form:"_id" json:"_id,omitempty"`
	}

	reqGeoEvent struct {
		GeoLoc geoLocation `form:"geoloc" json:"geoloc,omitempty"`
		Event  geoEvent    `form:"event" json:"event,omitempty"`
	}

	reqNear struct {
		Scope float64 `form:"scope" json:"scope,omitempty"`
		TGeos string  `form:"tgeos" json:"tgeos,omitempty"`
		Lat   float64 `form:"lat" json:"lat,omitempty"`
		Lng   float64 `form:"lng" json:"lng,omitempty"`
	}

	reqFilter struct {
		TObject string   `form:"tobject" json:"tobject,omitempty"`
		Scope   float64  `form:"scope" json:"scope,omitempty"`
		TTime   string   `form:"ttime" json:"ttime,omitempty"`
		Tags    []string `form:"tags" json:"tags,omitempty"`
		Lat     float64  `form:"lat" json:"lat,omitempty"`
		Lng     float64  `form:"lng" json:"lng,omitempty"`
	}

	eventLoc struct {
		ID        bson.ObjectId `form:"_id" bson:"_id,omitempty"`
		Name      string        `form:"name" bson:"name,omitempty"`
		Text      string        `form:"text" bson:"text,omitempty"`
		Tags      []string      `form:"tags" bson:"tags,omitempty"`
		TObject   string        `form:"tobject" bson:"tobject,omitempty"`
		Timestamp time.Time     `form:"timestamp" bson:"timestamp,omitempty"`
		Location  geoObject     `form:"location" bson:"location,omitempty"`
	}
)

func distance(locFrom, locTo *geoLocation) float64 {
	return math.Sqrt(
		math.Pow(locFrom.Location.Coordinates[0]-locTo.Location.Coordinates[0], 2) +
			math.Pow(locFrom.Location.Coordinates[1]-locTo.Location.Coordinates[1], 2),
	)
}
