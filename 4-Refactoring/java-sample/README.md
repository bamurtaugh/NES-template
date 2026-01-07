# Java Refactoring Sample: Copilot Next Edit Suggestions Demo

[![Open in Dev Containers](https://img.shields.io/static/v1?label=Dev%20Containers&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/microsoft/vscode-remote-try-java)

This project demonstrates how **Copilot Next Edit Suggestions (NES)** can assist with common refactoring tasks in Java applications. The sample is a simple interactive command-line application that includes a greeting system and a basic calculator, providing multiple opportunities to practice refactoring with NES.

A **development container** is a running container with a well-defined tool/runtime stack and its prerequisites. You can try out development containers with **[GitHub Codespaces](https://github.com/features/codespaces)** or **[Visual Studio Code Dev Containers](https://aka.ms/vscode-remote/containers)**.

This is a sample project that lets you try out either option in a few easy steps. We have a variety of other [vscode-remote-try-*](https://github.com/search?q=org%3Amicrosoft+vscode-remote-try-&type=Repositories) sample projects, too.

> **Note:** If you already have a Codespace or dev container, you can jump to the [Things to try](#things-to-try) section.

## Project Structure

```
java-sample/
├── .devcontainer/
│   └── devcontainer.json      # Dev container configuration
├── src/
│   ├── main/java/com/mycompany/app/
│   │   └── App.java           # Main application with greeting and calculator
│   └── test/java/com/mycompany/app/
│       └── AppTest.java       # Unit tests
├── pom.xml                    # Maven project configuration
└── README.md
```

## What This Application Does

The `App.java` file contains a simple command-line application that:
1. **Greets the user**: Prompts for and displays a personalized greeting
2. **Asks about programming preferences**: Collects the user's favorite programming language
3. **Performs basic arithmetic**: Implements a calculator that supports addition, subtraction, multiplication, and division with error handling for division by zero

This structure provides excellent opportunities for refactoring exercises such as extracting methods, improving error handling, adding validation, and restructuring code organization.

## Setting up the development container

### GitHub Codespaces
Follow these steps to open this sample in a Codespace:
1. Click the **Code** drop-down menu.
2. Click on the **Codespaces** tab.
3. Click **Create codespace on main**.

For more info, check out the [GitHub documentation](https://docs.github.com/en/free-pro-team@latest/github/developing-online-with-codespaces/creating-a-codespace#creating-a-codespace).

### VS Code Dev Containers

If you already have VS Code and Docker installed, you can click the badge above or [here](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/microsoft/vscode-remote-try-java) to get started. Clicking these links will cause VS Code to automatically install the Dev Containers extension if needed, clone the source code into a container volume, and spin up a dev container for use.

Follow these steps to open this sample in a container using the VS Code Dev Containers extension:

1. If this is your first time using a development container, please ensure your system meets the pre-reqs (i.e. have Docker installed) in the [getting started steps](https://aka.ms/vscode-remote/containers/getting-started).

2. To use this repository, you can either open the repository in an isolated Docker volume:

    - Press <kbd>F1</kbd> and select the **Dev Containers: Try a Sample...** command.
    - Choose the "Java" sample, wait for the container to start, and try things out!
        > **Note:** Under the hood, this will use the **Dev Containers: Clone Repository in Container Volume...** command to clone the source code in a Docker volume instead of the local filesystem. [Volumes](https://docs.docker.com/storage/volumes/) are the preferred mechanism for persisting container data.

   Or open a locally cloned copy of the code:

   - Clone this repository to your local filesystem.
   - Press <kbd>F1</kbd> and select the **Dev Containers: Open Folder in Container...** command.
   - Select the cloned copy of this folder, wait for the container to start, and try things out!

## How to Use This Example with NES

This sample is designed to help you practice refactoring with Copilot Next Edit Suggestions. Here are specific scenarios to try:

### Scenario 1: Extract Method Refactoring in [`App.java`](src/main/java/com/mycompany/app/App.java)

**Lines 17-21: Extract the greeting logic into a separate method**

1. Select lines 17-21 (the code that prompts for name and displays greeting):
   ```java
   // Ask for the user's first name
   System.out.print("Enter your name: ");
   String name = scanner.nextLine();

   // Greet the user
   System.out.println("Hello, " + name + "! Welcome to the Remote World!");
   ```

2. Start extracting by adding a new method signature above the `main` method:
   ```java
   private static void greetUser(Scanner scanner) {
   ```
   
   NES should suggest moving the greeting logic into this method and updating the `main` method to call it.

**Lines 24-27: Extract language preference into a separate method**

1. After extracting the greeting method, create another method for the language preference:
   ```java
   private static void askFavoriteLanguage(Scanner scanner) {
   ```
   
   NES should suggest extracting the language preference logic and calling it from `main`.

### Scenario 2: Extract Calculator Logic

**Lines 30-66: Refactor calculator into a separate method**

1. Add a new method signature for the calculator:
   ```java
   private static void runCalculator(Scanner scanner) {
   ```
   
   NES should suggest moving all the calculator logic (lines 30-66) into this method.

2. Further refactoring: Extract the operation switch statement into its own method:
   ```java
   private static double performOperation(double num1, double num2, char operation) {
   ```
   
   NES should suggest restructuring the switch statement to return the result and throw an exception for invalid operations.

### Scenario 3: Improve Error Handling

**Lines 52-57: Enhance division by zero error handling**

1. Create a custom exception class at the top of the file:
   ```java
   static class CalculatorException extends Exception {
       public CalculatorException(String message) {
           super(message);
       }
   }
   ```
   
   NES should suggest updating the division by zero check to throw this exception and adding try-catch blocks in the appropriate places.

### Scenario 4: Add Input Validation

**Lines 32 and 35: Add validation for numeric input**

1. Add a validation method:
   ```java
   private static double getValidNumber(Scanner scanner, String prompt) {
   ```
   
   NES should suggest implementing a validation loop that handles `InputMismatchException` and re-prompts the user for valid input.

2. After creating the method, update line 32 to use it:
   ```java
   double num1 = getValidNumber(scanner, "Enter the first number: ");
   ```
   
   NES should suggest updating line 35 to use the same method for the second number.

### Scenario 5: Improve Code Organization with Enums

**Lines 38-66: Replace char operation with an enum**

1. Create an Operation enum above the main method:
   ```java
   enum Operation {
       ADD('+'), SUBTRACT('-'), MULTIPLY('*'), DIVIDE('/');
       
       private final char symbol;
       
       Operation(char symbol) {
           this.symbol = symbol;
       }
       
       public char getSymbol() {
           return symbol;
       }
   }
   ```
   
   NES should suggest updating the switch statement to use the enum and adding a method to parse the character input into an Operation.

## Things to try

Once you have this sample opened, you'll be able to work with it like you would locally.

### Basic Development Container Features:

1. **Edit:**
   - Open `src/main/java/com/mycompany/app/App.java`.
   - Try adding some code and check out the language features.
   - Make a spelling mistake and notice it is detected. The [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) extension was automatically installed because it is referenced in `.devcontainer/devcontainer.json`.
   - Also notice that the [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) is installed. The JDK is in the `mcr.microsoft.com/devcontainers/java` image and Dev Container settings and metadata are automatically picked up from [image labels](https://containers.dev/implementors/reference/#labels).

2. **Terminal:** Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>\`</kbd> and type `uname` and other Linux commands from the terminal window.

3. **Build, Run, and Debug:**
   - Open `src/main/java/com/mycompany/app/App.java`.
   - Add a breakpoint.
   - Press <kbd>F5</kbd> to launch the app in the container.
   - Once the breakpoint is hit, try hovering over variables, examining locals, and more.
   - **Try the application**: Test the calculator with different inputs and operations to see how it works.

4. **Run Tests:**
   - Open `src/test/java/com/mycompany/app/AppTest.java`.
   - Put a breakpoint in a test.
   - Click the `Debug Test` in the Code Lens above the function and watch it hit the breakpoint.
   - **Run tests from terminal**: Execute `mvn test` to run all tests.

5. **Build the Project:**
   - Run `mvn clean package` in the terminal to build the JAR file.
   - Run the application with `java -jar target/my-app-1.0-SNAPSHOT.jar`.

6. **Install Node.js using a Dev Container Feature:**
   - Press <kbd>F1</kbd> and select the **Dev Containers: Configure Container Features...** or **Codespaces: Configure Container Features...** command.
   - Type "node" in the text box at the top.
   - Check the check box next to "Node.js (via nvm) and yarn" (published by devcontainers) 
   - Click OK
   - Press <kbd>F1</kbd> and select the **Dev Containers: Rebuild Container** or **Codespaces: Rebuild Container** command so the modifications are picked up.

  
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
