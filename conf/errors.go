package conf

import (
	// "fmt"
	"fmt"
	"net/http"
	// "os"
)

// #################### http error {{{

type ApiHttpError struct {
	Code     int    `json:"errorCode"`
	HttpCode int    `json:"-"`
	Message  string `json:"errorMsg"`
	Info     string `json:"errorInfo"`
}

func (t_error *ApiHttpError) Error() string {
	return t_error.Message
}

func NewApiHttpError(t_error error) *ApiHttpError {
	return &ApiHttpError{0, http.StatusInternalServerError, t_error.Error(), ""}
}

var ErrUserPassEmpty = &ApiHttpError{110, http.StatusBadRequest, "Password is empty", ""}
var ErrUserNotFound = &ApiHttpError{123, http.StatusNotFound, "User not found", ""}
var ErrUserIdEmpty = &ApiHttpError{130, http.StatusBadRequest, "Empty User Id", ""}
var ErrUserIdWrong = &ApiHttpError{131, http.StatusBadRequest, "Wrong User Id", ""}

// #################### http error }}}

// #################### abstract error {{{
// new

type ApiErrors struct {
	Errors []*ApiError `json:"errors"`
}

func (errors *ApiErrors) Status() int {
	return errors.Errors[0].Status
}

type ApiError struct {
	Status  int    `json:"status"`
	Code    string `json:"code"`
	Title   string `json:"title"`
	Details string `json:"details"`
	Href    string `json:"href"`
}

func NewApiError(status int, code string, title string, details string, href string) *ApiError {
	return &ApiError{
		Status:  status,
		Code:    code,
		Title:   title,
		Details: details,
		Href:    href,
	}
}

func (this_error *ApiError) Error() string {
	return this_error.Title
}

var (
	ErrDatabase      = NewApiError(500, "database_error", "Database Error", "An unknown error occurred.", "")
	ErrInvalidSet    = NewApiError(404, "invalid_set", "Invalid Set", "The set you requested does not exist.", "")
	ErrInvalidFind   = NewApiError(404, "invalid_find", "Invalid Find", "The find you requested does not exist.", "")
	ErrInvalidInsert = NewApiError(404, "invalid_insert", "Invalid Insertion", "The insert you requested does not exist.", "")
	ErrInvalidUpdate = NewApiError(404, "invalid_update", "Invalid Update", "The update you requested does not exist.", "")
	ErrInvalidGroup  = NewApiError(404, "invalid_group", "Invalid Group", "The group you requested does not exist.", "")

	ErrHttpsCert = NewApiError(055, "cert_not_such", "Not such cert", "filest with cert does not exist.", "")
	ErrJson      = NewApiError(100, "json_error", "Json Error", "An unknown error of json.marshal.", "")
)

// ==================== abstract error }}}

// ==================== easy error {{{
type EasyAPIError struct {
	Errors []ErrorDetail `json:"errors"`
}

// ErrorDetail represents an individual item in an EasyAPIError.
type ErrorDetail struct {
	Message string `json:"message"`
	Code    int    `json:"code"`
}

func NewEasyApiError(code int, message string) *ErrorDetail {
	return &ErrorDetail{
		Message: message,
		Code:    code,
	}
}

func (t_error EasyAPIError) Error() string {
	if len(t_error.Errors) > 0 {
		err := t_error.Errors[0]
		return fmt.Sprintf("twitter: %d %v", err.Code, err.Message)
	}
	return ""
}

// Empty returns true if empty. Otherwise, at least 1 error message/code is
// present and false is returned.
func (t_error EasyAPIError) Empty() bool {
	if len(t_error.Errors) == 0 {
		return true
	}
	return false
}

// ==================== }}}
