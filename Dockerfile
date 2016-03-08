FROM golang

#live reload
RUN go get github.com/pilu/fresh
#yoba http
RUN go get github.com/codegangsta/negroni 

#everything before ADD is cached by docker

ENTRYPOINT cd /go/src/back && /go/bin/fresh
 
EXPOSE 8080
