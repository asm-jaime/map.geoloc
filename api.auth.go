package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	gen "github.com/asm-jaime/gen"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

func getOauth2() oauth2.Config {
	return oauth2.Config{
		ClientID:     os.Getenv("CID"),
		ClientSecret: os.Getenv("CSECRET"),
		RedirectURL: "http://" +
			os.Getenv("HOST") + ":" + os.Getenv("PORT") + "/auth",
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
		},
		Endpoint: google.Endpoint,
	}
}

// auth handles authentication of a user and initiates a session
func authO2(mongo *mongoDB, o2 *oauth2.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
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
		token, err := o2.Exchange(oauth2.NoContext, code)
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest,
				gin.H{"msg": "Login failed. Please try again."})
			return
		}

		client := o2.Client(oauth2.NoContext, token)
		userinfo, err := client.Get("https://www.googleapis.com/oauth2/v3/userinfo")
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest,
				gin.H{"msg": "bad request on google.com", "body": nil})
			return
		}

		defer userinfo.Body.Close()
		data, _ := ioutil.ReadAll(userinfo.Body)
		user := geoUser{}
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

		guser, err := mongo.getUser(&user)
		if err != nil {
			err = mongo.postUser(&user)
			if err != nil {
				log.Println(err)
				c.JSON(http.StatusBadRequest,
					gin.H{"msg": "Error save user. Please try again."})
				return
			}
		}

		c.JSON(http.StatusOK, gin.H{"msg": "user authorized", "body": guser})
	}
}

// LoginHandler handles the login procedure
func login(o2 *oauth2.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		// set state session for auth user.Email <=> state
		state := gen.TokenB64(32)
		session := sessions.Default(c)
		session.Set("state", state)
		session.Save()

		// response
		scopes := strings.Join(o2.Scopes, " ")
		link := string(o2.Endpoint.AuthURL +
			"?client_id=" + o2.ClientID +
			"&redirect_uri=" + o2.RedirectURL +
			"&response_type=code&scope=" + scopes +
			"&state=" + state)

		c.JSON(http.StatusOK, gin.H{"msg": "", "body": link})
	}
}
