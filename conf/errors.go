package conf

import (
	"fmt"
	"net/http"
	"os"
)

type ApiError struct {
	Code     int    `json:"errorCode"`
	HttpCode int    `json:"-"`
	Message  string `json:"errorMsg"`
	Info     string `json:"errorInfo"`
}

func (e *ApiError) Error() string {
	return e.Message
}

func NewApiError(err error) *ApiError {
	return &ApiError{0, http.StatusInternalServerError, err.Error(), ""}
}

var ErrUserPassEmpty = &ApiError{110, http.StatusBadRequest, "Password is empty", ""}
var ErrUserNotFound = &ApiError{123, http.StatusNotFound, "User not found", ""}
var ErrUserIdEmpty = &ApiError{130, http.StatusBadRequest, "Empty User Id", ""}
var ErrUserIdWrong = &ApiError{131, http.StatusBadRequest, "Wrong User Id", ""}

func Check(err *error) {
	if *err != nil {
		fmt.Print(*err)
		os.Exit(1)
	}
}
