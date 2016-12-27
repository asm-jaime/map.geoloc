package models

import (
	"crypto/rand"
	"encoding/base64"
)

// RandToken generates a random @length token.
func RandToken(length int) string {
	thisByte := make([]byte, length)
	rand.Read(thisByte)
	return base64.StdEncoding.EncodeToString(thisByte)
}
