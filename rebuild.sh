#!/bin/sh

echo "Stopping..."
docker stop go_web_server
echo "Done"
docker rm go_web_server
docker build -t go_basic .
docker run -d -p 8000:8080 -name go_web_server go_basic
