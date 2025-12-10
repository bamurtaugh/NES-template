# Copilot Next Edit Suggestions (NES) Template Repository

This repository contains a collection of code examples designed to demonstrate and test **Copilot Next Edit Suggestions (NES)** capabilities. NES is a feature that provides intelligent, context-aware code suggestions when you make changes to your codebase.

## 📋 Overview

This template repository showcases how NES can assist developers across various programming languages and development scenarios. The examples range from simple intent changes to full-featured applications, demonstrating how NES can suggest related code updates as you edit.

## 🗂️ Repository Structure

The repository is organized into five main categories, each demonstrating different types of code editing scenarios:

```
NES-template/
├── 1-Changing_Intent/      # Simple code changes showing intent modifications
├── 2-Adding_Logic/         # Examples of adding new functionality
├── 3-Changing_Fixing_Logic/# Scenarios involving logic changes and bug fixes
├── 4-Refactoring/          # Refactoring examples
└── 5-Fuller/               # Full-featured application examples
```

### 1️⃣ Changing Intent (`1-Changing_Intent/`)

Simple examples demonstrating how changing the intent or purpose of code triggers relevant suggestions.

- **`geometry.ts`** - TypeScript class demonstrating geometric calculations
  - Example: Modify the `getDistance()` method and see NES suggest related updates
  
- **`stats.cpp`** - C++ statistics library with mean, standard deviation, and min calculations
  - Example: Change statistical formulas and observe suggestions for related functions

### 2️⃣ Adding Logic (`2-Adding_Logic/`)

Examples showing how NES helps when adding new features or logic to existing code.

- **`game.py`** - Python two-player guessing game
  - Example: Add new game mechanics (like difficulty levels) and see NES suggest updates to game logic, scoring, and player interactions
  
- **`extension-sample/`** - VS Code extension "Hello World" sample
  - Example: Add new commands and see NES suggest registration in `package.json` and activation events

### 3️⃣ Changing/Fixing Logic (`3-Changing_Fixing_Logic/`)

Scenarios involving modifications to existing logic or fixing bugs.

- **`scenarios.ts`** - TypeScript functions with various patterns
  - Example: Modify the `isPrime()` function implementation and see suggestions for test cases and usage examples
  
- **`js-game/`** - JavaScript game sample
  - Example: Fix game logic bugs and observe NES suggesting related changes in game state management

### 4️⃣ Refactoring (`4-Refactoring/`)

Complex refactoring scenarios in a production-like environment.

- **`java-sample/`** - Java development container sample
  - Full Maven project with development container configuration
  - Example: Refactor class structures and see NES suggest updates across multiple files, tests, and configurations
  - Includes comprehensive documentation, contributing guidelines, and security policies

### 5️⃣ Fuller Examples (`5-Fuller/`)

Complete, feature-rich applications demonstrating NES in realistic development scenarios.

- **`task-manager-app/`** - React + TypeScript task management application
  - Complete application with components, context, hooks, and TypeScript types
  - Multiple demonstration scenarios included in the README:
    - Adding parameters and confirmation logic
    - Refactoring conditionals to switch statements
    - Adding new interface fields and seeing propagation
    - Creating type aliases and enums with automatic updates
  - Perfect for testing NES with modern React patterns and TypeScript

## 🚀 Getting Started

### Prerequisites

Depending on which examples you want to explore, you may need:

- **Node.js and npm** - For JavaScript/TypeScript examples (folders 2, 3, 5)
- **Python 3** - For Python examples (folder 2)
- **C++ compiler** - For C++ examples (folder 1)
- **Java and Maven** - For Java examples (folder 4)
- **Visual Studio Code** - For extension samples and development containers

### Using the Examples

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd NES-template
   ```

2. **Navigate to a specific example:**
   ```bash
   cd 1-Changing_Intent
   # or
   cd 5-Fuller/task-manager-app
   ```

3. **Follow the scenario instructions:**
   - Each major example includes its own README with specific scenarios to try
   - Open the files in VS Code with Copilot enabled
   - Make the suggested changes and observe NES suggestions

4. **For runnable examples:**
   
   **Python game:**
   ```bash
   cd 2-Adding_Logic
   python game.py
   ```
   
   **Task Manager App:**
   ```bash
   cd 5-Fuller/task-manager-app
   npm install
   npm start
   ```
   
   **VS Code Extension:**
   ```bash
   cd 2-Adding_Logic/extension-sample
   npm install
   # Press F5 in VS Code to run the extension
   ```
   
   **Java Sample:**
   ```bash
   cd 4-Refactoring/java-sample
   # Open in VS Code with Dev Containers extension
   # Or use GitHub Codespaces
   ```

## 🎯 How to Use NES with These Examples

1. **Open a file** in VS Code with GitHub Copilot enabled
2. **Make a change** as described in the scenario (e.g., add a parameter, change a type)
3. **Observe the suggestions** - NES will analyze your change and suggest related updates across your codebase
4. **Review and accept** the suggestions that make sense for your change

## 📖 Example Scenarios

### Quick Start Scenario: Task Manager Types

Try this scenario to see NES in action:

1. Open `5-Fuller/task-manager-app/src/types/task.ts`
2. In the Task interface (after line 12, before the closing brace), add: `isArchived: boolean;`
3. Watch NES suggest adding the same field to `TaskFormData` type
4. Accept the suggestion and see how NES maintains type consistency

### Intermediate Scenario: Python Game Enhancement

1. Open `2-Adding_Logic/game.py`
2. Add a difficulty parameter to `play_game()` function
3. Observe NES suggesting updates to:
   - Function calls that use `play_game()`
   - Game logic that should respect difficulty
   - User prompts and messages

## 🤝 Contributing

Contributions are welcome! If you have additional scenarios or examples that demonstrate NES capabilities:

1. Fork the repository
2. Create a new branch for your scenario
3. Add your example with clear documentation
4. Include a README if it's a complex example
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License. See individual sample folders for specific license information where applicable.

## 🔗 Related Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [VS Code API Documentation](https://code.visualstudio.com/api)
- [Development Containers](https://containers.dev/)

## 📞 Support

For issues or questions about this template repository, please open an issue in the GitHub repository.

---

**Note:** This is a template repository designed for demonstration purposes. The code examples are meant to showcase NES capabilities and may not represent production-ready implementations.
