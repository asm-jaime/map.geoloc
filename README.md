### backend for dvij

#### how to start

  * `go get`
  * `go get -v ./...`
  * `mkdir keys`
  * `touch google_key.json` and set
 
  ```json
  {
  "cid": "295529031882-ap6njd8e8p0bmggmvkb7t0iflhcetjn1.apps.googleusercontent.com",
  "csecret": "ICiVhKO51UxbNfIQVR7WudxH"
  }
  ```
  * `go run main.go start std`
  * `http://localhost:8080`