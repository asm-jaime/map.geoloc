#!/bin/sh

#script current directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo $DIR

echo "Stopping..."
docker stop go_web_server
echo "Done"
docker rm go_web_server
docker build -t go_basic .
docker run -d -p 8000:8080 -v $DIR:/go/src/back -name go_web_server go_basic
