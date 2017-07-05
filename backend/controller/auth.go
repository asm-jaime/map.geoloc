package controller

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	gen "github.com/asm-jaime/gen"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	md "map.geoloc/backend/model"
)

// AuthHandler handles authentication of a user and initiates a session {{{
func AuthHandler(c *gin.Context) {
	mongo, ok := c.Keys["db"].(*md.MongoDB)
	if !ok {
		c.JSON(http.StatusInternalServerError,
			gin.H{"msg": "db not available", "body": nil})
	}
	coauth, _ := c.Keys["oauth"].(*oauth2.Config)

	session := sessions.Default(c)
	ret_state := session.Get("state")
	req_state := c.Request.URL.Query().Get("state")

	if ret_state != req_state {
		fmt.Printf("retrievedState: %v\n queryState: %v\n", ret_state, req_state)
		c.JSON(http.StatusUnauthorized,
			gin.H{"msg": "Invalid session state."})
		return
	}

	code := c.Request.URL.Query().Get("code")
	token, err := coauth.Exchange(oauth2.NoContext, code)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest,
			gin.H{"msg": "Login failed. Please try again."})
		return
	}

	client := coauth.Client(oauth2.NoContext, token)
	userinfo, err := client.Get("https://www.googleapis.com/oauth2/v3/userinfo")
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest,
			gin.H{"msg": "bad request on google.com", "body": nil})
		return
	}

	defer userinfo.Body.Close()
	data, _ := ioutil.ReadAll(userinfo.Body)
	user := md.User{}
	if err = json.Unmarshal(data, &user); err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest,
			gin.H{"msg": "Error marshalling response. Please try agian."})
		return
	}

	session.Set("user-id", user.Email)
	err = session.Save()
	if err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"msg": "Error save session. Please try again."})
		return
	}

	guser, err := mongo.GetUser(&user)
	if err != nil {
		err = mongo.PostUser(&user)
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest,
				gin.H{"msg": "Error save user. Please try again."})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"msg": "user authorized", "body": guser})
} // }}}

// LoginHandler handles the login procedure {{{
func LoginHandler(c *gin.Context) {
	cauth, _ := c.Keys["oauth"].(*oauth2.Config)
	// set state session for auth user.Email <=> state
	state := gen.TokenB64(32)
	session := sessions.Default(c)
	session.Set("state", state)
	session.Save()

	// response
	scopes := strings.Join(cauth.Scopes, " ")
	link := string(cauth.Endpoint.AuthURL +
		"?client_id=" + cauth.ClientID +
		"&redirect_uri=" + cauth.RedirectURL +
		"&response_type=code&scope=" + scopes +
		"&state=" + state)

	c.JSON(http.StatusOK, gin.H{"msg": "", "body": link})
} // }}}

// FieldHandler is a rudementary handler for logged in users
func FieldHandler(c *gin.Context) {
	session := sessions.Default(c)
	usermail := session.Get("user-id")
	if usermail != "" {
		c.JSON(http.StatusOK,
			gin.H{"msg": "get user-id succefull", "body": usermail})
	} else {
		c.JSON(http.StatusNotFound,
			gin.H{"msg": "user-id 0 have not set", "body": nil})
	}
} // 0
