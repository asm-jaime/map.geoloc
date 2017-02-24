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
	if (len(args) > 2) && args[1] == "start" {
		startServer(args)
	} else if len(args) == 3 && args[1] == "help" {
		printCommandsHelp(args[2])
	} else if len(args) == 2 && args[1] == "help" {
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
}

func printCommandsHelp(command string) {
	switch command {
	case "start":
	default:
		fmt.Println("---------------")
		fmt.Println("ERROR")
		fmt.Println("Incorrect command")
		fmt.Println("---------------")
	}
}

func startServer(args []string) {
	switch args[2] {
	case "std":
		geoloc.Start(args)
	case "geoloc":
		geoloc.Start(args)
	case "chat":
		chat.Start(args)
	default:
		fmt.Println("---------------")
		fmt.Println("ERROR")
		fmt.Println("Incorrect command")
		fmt.Println("---------------")
	}
}
