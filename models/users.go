package models

import (
	"sync"

	"dvij.geoloc/conf"
	//"encoding/json"
	//"fmt"
	//"gopkg.in/mgo.v2"

	"gopkg.in/mgo.v2/bson"
)

// DviUser structure for all data for the user
type DviUser struct {
	ID       bson.ObjectId `bson:"Id,omitempty"`
	Username string        `bson:"name"`
	Email    string        `bson:"email"`
	Descr    string        `bson:"description"`
	Location GeoPoint      `bson:"location"`
}

// DviUsers map for users
type DviUsers struct {
	Users map[string]DviUser `json:"users"`
	sync.RWMutex
}

// NewUsers make new empty state for users
func NewUsers() *DviUsers { // {{{
	return &DviUsers{
		Users: make(map[string]DviUser),
	}
} // }}}

// InsertDviUser insert a user to db
func (thisUser *DviUser) InsertDviUser() *conf.ApiError { // {{{
	session, apiError := DbSession(conf.MgoConfig())
	if apiError != nil {
		return apiError
	}

	defer session.Close()
	collection := session.DB(conf.MgoDatabase).C("dviUsers")
	err := collection.Insert(thisUser)
	if err != nil {
		return conf.ErrInvalidInsert
	}
	return nil
} // }}}

// SetRnd set standart params for the user
func (thisUser *DviUser) SetRnd() { // {{{
	thisUser.ID = bson.NewObjectId()
	thisUser.Username = "jhon doe"
	thisUser.Descr = "some descr"
	// rnd := rand.New(rand.NewSource(time.Now().UnixNano()))
	thisUser.Location.SetRnd()
} // }}}

// FillRnd make random users
func (thisUsers *DviUsers) FillRnd(num int) { // {{{
	thisUsers.Lock()
	defer thisUsers.Unlock()

	var thisID string
	thisUsers = NewUsers()
	thisUser := new(DviUser)
	for i := 0; i < num; i++ {
		thisUser.SetRnd()
		thisID = thisUser.ID.String()
		thisUsers.Users[thisID] = *thisUser
	}
} // }}}

// InsertDviUsers bulk insters users into db
func (thisUsers *DviUsers) InsertDviUsers() *conf.ApiError { // {{{
	thisUsers.Lock()
	defer thisUsers.Unlock()

	var err error

	session, apiError := DbSession(conf.MgoConfig())
	if apiError != nil {
		return apiError
	}

	defer session.Close()
	collection := session.DB(conf.MgoDatabase).C("dviUsers")
	for _, thisUser := range thisUsers.Users {
		err = collection.Insert(thisUser)
	}
	if err != nil {
		return conf.ErrInvalidInsert
	}
	return nil
} // }}}

// UpdateUsersPosition update all points for users
func (thisUsers *DviUsers) UpdateUsersPosition() *conf.ApiError { // {{{
	thisUsers.Lock()
	defer thisUsers.Unlock()

	var err error
	session, apiError := DbSession(conf.MgoConfig())
	if apiError != nil {
		return apiError
	}
	defer session.Close()
	collection := session.DB(conf.MgoDatabase).C("dviUsers")
	for _, thisUser := range thisUsers.Users {
		err = collection.UpdateId(thisUser.ID, thisUser)
	}
	if err != nil {
		return conf.ErrInvalidUpdate
	}
	return nil
} // }}}
