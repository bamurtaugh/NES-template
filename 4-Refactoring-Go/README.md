# Try Out Development Containers: Go

[![Open in Dev Containers](https://img.shields.io/static/v1?label=Dev%20Containers&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/bamurtaugh/NES-template)

A **development container** is a running container with a well-defined tool/runtime stack and its prerequisites. You can try out development containers with **[GitHub Codespaces](https://github.com/features/codespaces)** or **[Visual Studio Code Dev Containers](https://aka.ms/vscode-remote/containers)**.

This is a Go version of the Java sample project that lets you try out either option in a few easy steps. This Go example demonstrates the same functionality as the Java version: an interactive console application with user input and a simple calculator.

> **Note:** This is the Go equivalent of the Java sample in the `4-Refactoring/java-sample` folder.

## Setting up the development container

### GitHub Codespaces
Follow these steps to open this sample in a Codespace:
1. Click the **Code** drop-down menu.
2. Click on the **Codespaces** tab.
3. Click **Create codespace on main**.

For more info, check out the [GitHub documentation](https://docs.github.com/en/free-pro-team@latest/github/developing-online-with-codespaces/creating-a-codespace#creating-a-codespace).

### VS Code Dev Containers

If you already have VS Code and Docker installed, you can use the Dev Containers extension to work with this Go sample.

## Things to try

Once you have this sample opened, you'll be able to work with it like you would locally.

Some things to try:

1. **Edit:**
   - Open `main.go`.
   - Try adding some code and check out the language features.
   - Notice Go's syntax highlighting and IntelliSense features.

2. **Terminal:** Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>\`</kbd> and type `uname` and other Linux commands from the terminal window.

3. **Build, Run, and Debug:**
   - Open `main.go`.
   - Add a breakpoint.
   - Press <kbd>F5</kbd> to launch the app in the container.
   - Once the breakpoint is hit, try hovering over variables, examining locals, and more.
   - Alternatively, run the program from the terminal: `go run main.go`

4. **Run Tests:**
   - Open `main_test.go`.
   - Put a breakpoint in a test.
   - Run tests from the terminal: `go test`
   - Use the Go extension's test runner features.

5. **Build the Application:**
   - Build the application: `go build main.go`
   - Run the compiled binary: `./main` (on Linux/macOS) or `main.exe` (on Windows)

## Application Features

This Go application demonstrates:

- **Interactive Console Input:** Prompts user for name and favorite programming language
- **String Formatting:** Uses Go's `fmt` package for formatted output
- **Input Validation:** Handles invalid number inputs gracefully
- **Calculator Operations:** Supports addition, subtraction, multiplication, and division
- **Error Handling:** Prevents division by zero and handles invalid operations
- **Testing:** Includes basic unit tests using Go's built-in testing framework

The application flow:
1. Greets the user with "Hello Remote World!"
2. Asks for and stores the user's name
3. Asks for their favorite programming language
4. Runs a simple calculator with error handling

## Go-Specific Features

This example showcases:

- Go modules (`go.mod`)
- Standard library usage (`bufio`, `fmt`, `os`, `strconv`, `strings`)
- Error handling with Go's explicit error return pattern
- Go's testing framework
- String manipulation and type conversion

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## License

Copyright © Microsoft Corporation All rights reserved.<br />
Licensed under the MIT License. See LICENSE in the project root for license information.