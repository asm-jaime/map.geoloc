package conf

// "fmt"

// "os"

// #################### abstract error {{{

// APIError structure for processing errors
type APIError struct {
	Status  int    `json:"status"`
	Code    string `json:"code"`
	Title   string `json:"title"`
	Details string `json:"details"`
	Href    string `json:"href"`
}

// APIErrors struct for map of errors
type APIErrors struct {
	Errors []*APIError `json:"errors"`
}

// Status get error status
func (errors *APIErrors) Status() int {
	return errors.Errors[0].Status
}

// NewAPIError make a info-struct error
func NewAPIError(status int, code string, title string, details string, href string) *APIError {
	return &APIError{
		Status:  status,
		Code:    code,
		Title:   title,
		Details: details,
		Href:    href,
	}
}

func (thisError *APIError) Error() string {
	return thisError.Title
}

var (
	// ErrDatabase etc..
	ErrDatabase = NewAPIError(500, "databaseError", "Database Error", "An unknown error occurred.", "")
	// ErrSession ..
	ErrSession = NewAPIError(501, "invalidSession", "Invalid session", "An unknown error occurred.", "")
	// ErrInvalidSet ..
	ErrInvalidSet = NewAPIError(404, "invalidSet", "Invalid Set", "The set you requested does not exist.", "")
	// ErrInvalidFind ..
	ErrInvalidFind = NewAPIError(404, "invalidFind", "Invalid Find", "The find you requested does not exist.", "")
	// ErrInvalidInsert ..
	ErrInvalidInsert = NewAPIError(404, "invalidInsert", "Invalid Insertion", "The insert you requested does not exist.", "")
	// ErrInvalidUpdate ..
	ErrInvalidUpdate = NewAPIError(404, "invalidUpdate", "Invalid Update", "The update you requested does not exist.", "")
	// ErrInvalidGroup ..
	ErrInvalidGroup = NewAPIError(404, "invalidGroup", "Invalid Group", "The group you requested does not exist.", "")

	// ErrHTTPSCert ..
	ErrHTTPSCert = NewAPIError(055, "certNotSuch", "Not such cert", "filest with cert does not exist.", "")
	// ErrJSON ..
	ErrJSON = NewAPIError(100, "jsonError", "Json Error", "An unknown error of json.marshal.", "")
)

// ==================== abstract error }}}
