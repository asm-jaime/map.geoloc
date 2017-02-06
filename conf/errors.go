package conf

import (
	"fmt"
	"net/http"
	// "os"
)

// APIError structure for processing errors
type APIError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Href    string `json:"href"`
}

// NewAPIError
func NewAPIError(err error) *APIError {
	if err == nil {
		return ErrNoError
	} else {
		return &APIError{http.StatusInternalServerError, err.Error(), ""}
	}
}

func (err *APIError) Error() string {
	return err.Message
}

func (err *APIError) PrintError() {
	fmt.Printf("\ncode: %d, %s", err.Code, err.Message)
	if err.Href != "" {
		fmt.Print(err.Href)
	}
}

var (
	ErrNoError       = &APIError{0, "No error.", ""}
	ErrDatabase      = &APIError{http.StatusInternalServerError, "An unknown error occurred.", ""}
	ErrSession       = &APIError{http.StatusInternalServerError, "An unknown error occurred.", ""}
	ErrInvalidSet    = &APIError{http.StatusInternalServerError, "The set you requested does not exist.", ""}
	ErrInvalidFind   = &APIError{http.StatusInternalServerError, "The find you requested does not exist.", ""}
	ErrInvalidInsert = &APIError{http.StatusInternalServerError, "The insert you requested does not exist.", ""}
	ErrInvalidUpdate = &APIError{http.StatusInternalServerError, "The update you requested does not exist.", ""}
	ErrInvalidGroup  = &APIError{http.StatusInternalServerError, "The group you requested does not exist.", ""}
	ErrHTTPSCert     = &APIError{http.StatusInternalServerError, "filest with cert does not exist.", ""}
	ErrJSON          = &APIError{http.StatusInternalServerError, "An unknown error of json.marshal.", ""}
)
