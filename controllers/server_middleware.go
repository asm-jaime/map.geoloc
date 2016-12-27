package controllers

import (
	"net/http"

	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
)

// AuthorizeRequest is used to authorize a request for a certain end-point group.
func AuthorizeRequest() gin.HandlerFunc {
	return func(thisContext *gin.Context) {
		session := sessions.Default(thisContext)
		v := session.Get("user-id")
		if v == nil {
			thisContext.JSON(http.StatusUnauthorized, gin.H{"status": "unauthorized"})
			thisContext.Abort()
		}
		thisContext.Next()
	}
}
