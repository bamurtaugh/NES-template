# NES Template Repository

This repository contains multiple example projects demonstrating Copilot Next Edit Suggestions (NES) capabilities. Each project showcases different development scenarios and programming languages.

## Projects Overview

### 1. Changing Intent (`1-Changing_Intent/`)
Contains TypeScript and C++ code samples for demonstrating intent changes.

### 2. Adding Logic (`2-Adding_Logic/`)
- **extension-sample**: A VS Code extension written in TypeScript
- **game.py**: A Python-based two-player guessing game

### 3. Changing/Fixing Logic (`3-Changing_Fixing_Logic/`)
- **js-game**: A Node.js/Express-based Wordle clone
- **scenarios.ts**: TypeScript scenarios for logic changes

### 4. Refactoring (`4-Refactoring/`)
- **java-sample**: A Java/Maven project demonstrating refactoring scenarios

### 5. Fuller Example (`5-Fuller/`)
- **task-manager-app**: A comprehensive React TypeScript task manager application

## Testing Information

### Java Project (`4-Refactoring/java-sample`)

This project uses **Maven** with **JUnit 4.13.2** for testing.

**Prerequisites:**
- Java 11 or higher
- Maven

**Running Tests:**
```bash
cd 4-Refactoring/java-sample
mvn test
```

**Test Location:**
- Tests are located in `src/test/java/com/mycompany/app/`

**Building:**
```bash
mvn clean install
```

### React Task Manager App (`5-Fuller/task-manager-app`)

This project uses **React** with **Jest** and **React Testing Library**.

**Prerequisites:**
- Node.js (v16 or higher)
- npm

**Installing Dependencies:**
```bash
cd 5-Fuller/task-manager-app
npm install
```

**Running Tests:**
```bash
npm test
```

This will launch the test runner in interactive watch mode.

**Other Commands:**
```bash
# Start development server
npm start

# Build for production
npm run build
```

**Test Configuration:**
- Testing framework: Jest (via react-scripts)
- Testing utilities: @testing-library/react, @testing-library/jest-dom
- Test files: Look for `*.test.ts` or `*.test.tsx` files in the project

### VS Code Extension (`2-Adding_Logic/extension-sample`)

This TypeScript extension project includes compilation and linting but no automated tests.

**Prerequisites:**
- Node.js
- npm

**Installing Dependencies:**
```bash
cd 2-Adding_Logic/extension-sample
npm install
```

**Building:**
```bash
# Compile TypeScript
npm run compile

# Watch mode for development
npm run watch

# Lint code
npm run lint
```

**Running the Extension:**
1. Open the project in VS Code
2. Press `F5` or use the "Run Extension" debug configuration
3. This will open a new VS Code window with the extension loaded

### Node.js Game (`3-Changing_Fixing_Logic/js-game/game-sample`)

This Express-based game currently has no tests configured.

**Prerequisites:**
- Node.js
- npm

**Installing Dependencies:**
```bash
cd 3-Changing_Fixing_Logic/js-game/game-sample
npm install
```

**Running the Application:**
```bash
npm start
```

This will start the Express server on the default port.

### Python Game (`2-Adding_Logic/game.py`)

A standalone Python script with no automated tests.

**Prerequisites:**
- Python 3.x

**Running the Game:**
```bash
cd 2-Adding_Logic
python game.py
```

This is an interactive two-player guessing game that runs in the terminal.

## Contributing

When contributing to this repository:
1. Ensure all existing tests pass before submitting changes
2. For Java projects: Run `mvn test`
3. For React projects: Run `npm test`
4. For TypeScript projects: Run `npm run compile` and `npm run lint`

## Project Purpose

This repository serves as a template and demonstration of various coding scenarios for testing and showcasing Copilot Next Edit Suggestions (NES) capabilities across different languages and frameworks.
