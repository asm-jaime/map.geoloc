package main

import (
	"fmt"
	"os"

	"dvij.geoloc/chat"
	"dvij.geoloc/conf"
	"dvij.geoloc/geoloc"
)

var MsgState *conf.MsgState

func main() {
	// processing console arguments
	args := os.Args
	if len(args) > 1 && args[1] == "start" {
		start(args)
	} else if len(args) > 1 && args[1] == "help" {
		printFullHelp()
	} else {
		incorrectCommand()
	}
}

func incorrectCommand() {
	fmt.Println("---------------")
	fmt.Println("ERROR")
	fmt.Println("Incorrect command")
	fmt.Println("For help run \"./dvij.geoloc help\"")
	fmt.Println("---------------")
}

func printFullHelp() {
	//
	fmt.Println("========================================")
	fmt.Println("arguments for start:")
	fmt.Println("========================================")
	fmt.Println("start initdb - full init database")
	fmt.Println("be wary, old data will be dropped")
	fmt.Println("====================")
	fmt.Println("start geoloc - start only geolocation server")
	fmt.Println("====================")
	fmt.Println("start chat - start only chat hub")
	fmt.Println("====================")
	fmt.Println("start std - start all std services with default parameters")
	fmt.Println("========================================")
}

func start(args []string) {
	switch args[2] {
	case "std":
		geoloc.Start(args)
	case "geoloc":
		geoloc.Start(args)
	case "initdb":
		geoloc.StartInitDB()
	case "chat":
		chat.Start(args)
	default:
		fmt.Println("---------------")
		fmt.Println("ERROR")
		fmt.Println("Incorrect command")
		fmt.Println("---------------")
	}
}
