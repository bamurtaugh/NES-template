/*----------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 *---------------------------------------------------------------------------------------*/

package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	fmt.Println("Hello Remote World!")

	// Ask for the user's first name
	fmt.Print("Enter your name: ")
	scanner.Scan()
	name := scanner.Text()

	// Greet the user
	fmt.Printf("Hello, %s! Welcome to the Remote World!\n", name)

	// Ask for the user's favorite programming language
	fmt.Print("Enter your favorite programming language: ")
	scanner.Scan()
	language := scanner.Text()

	fmt.Printf("%s is a great choice!\n", language)

	// Simple calculator
	fmt.Println("Let's do some basic arithmetic.")
	fmt.Print("Enter the first number: ")
	scanner.Scan()
	num1Str := scanner.Text()
	num1, err := strconv.ParseFloat(num1Str, 64)
	if err != nil {
		fmt.Printf("Error: Invalid number '%s'\n", num1Str)
		return
	}

	fmt.Print("Enter the second number: ")
	scanner.Scan()
	num2Str := scanner.Text()
	num2, err := strconv.ParseFloat(num2Str, 64)
	if err != nil {
		fmt.Printf("Error: Invalid number '%s'\n", num2Str)
		return
	}

	fmt.Print("Choose an operation (+, -, *, /): ")
	scanner.Scan()
	operation := strings.TrimSpace(scanner.Text())

	var result float64
	switch operation {
	case "+":
		result = num1 + num2
	case "-":
		result = num1 - num2
	case "*":
		result = num1 * num2
	case "/":
		if num2 != 0 {
			result = num1 / num2
		} else {
			fmt.Println("Error: Division by zero is not allowed.")
			return
		}
	default:
		fmt.Println("Invalid operation.")
		return
	}

	fmt.Printf("The result of the operation is: %g\n", result)
}