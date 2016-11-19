package main

import (
	"dvij.geoloc/conf"
	"dvij.geoloc/controllers"
)

func main() {
	// go controllers.MakeHttpRouterServer(conf.HttpRouterServerPort)
	controllers.MakeEchoServerV1(conf.EchoServerPort)
}
