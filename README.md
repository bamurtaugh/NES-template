# NES Template

A collection of examples and templates for demonstrating GitHub Copilot's Next Edit Suggestions (NES) feature across different programming languages and development scenarios.

## Description

This repository provides a comprehensive set of sample projects that showcase how GitHub Copilot's Next Edit Suggestions can assist developers in various real-world coding scenarios. The examples span multiple programming languages and development contexts, from simple intent changes to complex refactoring tasks.

### What's Included

The repository is organized into several directories, each focusing on different aspects of Next Edit Suggestions:

- **1-Changing_Intent** - Simple examples showing how NES helps when changing the intent or purpose of code
- **2-Adding_Logic** - VS Code extension sample demonstrating how NES assists in adding new functionality  
- **3-Changing_Fixing_Logic** - JavaScript game example showing how NES helps fix bugs and modify existing logic
- **4-Refactoring** - Java application demonstrating how NES assists with code refactoring tasks
- **5-Fuller** - Advanced React/TypeScript task manager app showcasing comprehensive NES capabilities

### Programming Languages Covered

- TypeScript
- JavaScript  
- Java
- C++

## Installation

This repository contains multiple independent sample projects. To get started:

1. Clone this repository:
   ```bash
   git clone https://github.com/bamurtaugh/NES-template.git
   cd NES-template
   ```

2. Navigate to the specific example you want to explore:
   ```bash
   cd [directory-name]
   ```

3. Follow the setup instructions in each project's individual README file.

### Project-Specific Setup

- **VS Code Extension Sample** (`2-Adding_Logic/extension-sample`):
  ```bash
  cd 2-Adding_Logic/extension-sample
  npm install
  ```

- **JavaScript Game** (`3-Changing_Fixing_Logic/js-game`):
  ```bash
  cd 3-Changing_Fixing_Logic/js-game
  npm install
  npm start
  ```

- **Task Manager App** (`5-Fuller/task-manager-app`):
  ```bash
  cd 5-Fuller/task-manager-app
  npm install
  npm start
  ```

- **Java Sample** (`4-Refactoring/java-sample`):
  ```bash
  cd 4-Refactoring/java-sample
  mvn compile
  mvn exec:java
  ```

## Usage

Each directory contains specific examples designed to demonstrate different Next Edit Suggestions scenarios:

### Quick Start Guide

1. **Choose an example** based on your programming language or scenario of interest
2. **Open the project** in VS Code with GitHub Copilot enabled  
3. **Follow the README** in each project directory for specific NES demonstration steps
4. **Make the suggested edits** and observe how Copilot provides intelligent next-step suggestions

### Demonstration Scenarios

- **Simple Intent Changes**: Modify basic geometric calculations in TypeScript
- **Adding Functionality**: Extend VS Code extensions with new commands and features
- **Bug Fixes**: Correct logic errors in game mechanics  
- **Refactoring**: Improve code structure and organization in Java applications
- **Complex Applications**: Work with React components, state management, and TypeScript interfaces

### Best Practices

- Ensure GitHub Copilot is enabled and configured in your development environment
- Start with smaller examples before moving to more complex scenarios
- Pay attention to the comments and suggestions provided in each example
- Experiment with variations of the suggested edits to see different NES responses

## Contributing

Contributions are welcome! If you have ideas for additional NES examples or improvements to existing ones:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Guidelines

- Each new example should include clear documentation
- Provide step-by-step instructions for demonstrating NES features
- Include comments explaining the expected Copilot behavior
- Test examples across different development environments when possible

## License

This project is licensed under the MIT License - see the [LICENSE](4-Refactoring/java-sample/LICENSE) file for details.

Copyright (c) Microsoft Corporation. All rights reserved.