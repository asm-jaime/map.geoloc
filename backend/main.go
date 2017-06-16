package main

import (
	"fmt"
	"os"

	ct "map.geoloc/backend/ctgeos"
)

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
	fmt.Println("For help run \"./backend help\"")
	fmt.Println("---------------")
}

func printFullHelp() {
	//
	fmt.Println("========================================")
	fmt.Println("arguments for start:")
	fmt.Println("========================================")
	fmt.Println("start init - full init db")
	fmt.Println("be wary, old data will be dropped")
	fmt.Println("====================")
	fmt.Println("start geoloc - geolocation server")
	fmt.Println("====================")
	fmt.Println("start geoloc 8081 localhost conf/clientid.google.json ./public")
	fmt.Println("====================")
	fmt.Println("start chat - chat hub")
	fmt.Println("====================")
	fmt.Println("start std - start all std services with default parameters")
	fmt.Println("========================================")
}

func start(args []string) {
	switch args[2] {
	case "std":
		ct.Start(args)
	case "geoloc":
		ct.Start(args)
	case "init":
		err := ct.InitDB()
		if err != nil {
			fmt.Printf("\nsomething wrong with init database: %v\n", err)
		} else {
			fmt.Println("====================")
			fmt.Println("init db successful complete.")
			fmt.Println("====================")
		}

	// case "chat":
	// ct.StartChat(args)
	default:
		fmt.Println("---------------")
		fmt.Println("ERROR")
		fmt.Println("Incorrect command")
		fmt.Println("---------------")
	}
}
