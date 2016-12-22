package main

import (
	"dvij.geoloc/conf"
	"dvij.geoloc/controllers"
)

func main() {
	thisServer := new(controllers.Server)
	thisServer.NewEngine(conf.GinServerPort)
	// go controllers.MakeHttpRouterServer(conf.HttpRouterServerPort)
	// controllers.MakeEchoServerV1(conf.EchoServerPort)
}
