# NES (Next Edit Suggestions) Template Repository

This repository contains sample projects demonstrating various scenarios for GitHub Copilot's Next Edit Suggestions (NES) feature. NES helps developers by intelligently suggesting related code changes across multiple files when you make an initial edit.

## Purpose

This template repository serves as a collection of realistic code examples that showcase how NES can assist with:
- Understanding code intent and propagating changes
- Adding new logic and functionality
- Fixing bugs and logical errors
- Refactoring and code improvements
- Working with fuller, more complex applications

## Repository Structure

The repository is organized into 5 directories, each representing different complexity levels and scenarios:

### 1. `1-Changing_Intent/`
**Scenario**: Simple, isolated code files for demonstrating intent-based suggestions

Contains:
- **`geometry.ts`**: TypeScript class for geometric calculations (Point class with distance calculation)
- **`stats.cpp`**: C++ statistics class with mean, standard deviation, and min calculations

**Use Case**: Modify method signatures, parameter names, or class structure and observe NES suggestions for related changes.

### 2. `2-Adding_Logic/`
**Scenario**: Adding new features or logic to existing code

Contains:
- **`game.py`**: Python two-player guessing game with player names, turns, and game loop
- **`extension-sample/`**: VS Code extension "Hello World" sample (TypeScript)
  - Full VS Code extension with commands and contribution points
  - See [extension-sample/README.md](2-Adding_Logic/extension-sample/README.md) for details

**Use Case**: Add new parameters, validation logic, or features and see NES suggest complementary changes.

### 3. `3-Changing_Fixing_Logic/`
**Scenario**: Fixing bugs or modifying existing logic

Contains:
- **`scenarios.ts`**: TypeScript file with various function patterns (optional params, default params, arrow functions, prime checker)
- **`js-game/`**: Express.js Wordle-like word guessing game
  - Simple web server with static file serving
  - Game logic for 5-letter word guessing with feedback

**Use Case**: Fix bugs, update conditions, or change algorithms and observe NES's understanding of the fix scope.

### 4. `4-Refactoring/`
**Scenario**: Code quality improvements and refactoring

Contains:
- **`java-sample/`**: Full Java Maven project with dev container configuration
  - Based on VS Code remote development sample
  - Includes JUnit tests, Maven build configuration
  - See [java-sample/README.md](4-Refactoring/java-sample/README.md) for details

**Use Case**: Refactor code patterns, rename variables, or restructure code and see NES propagate changes.

### 5. `5-Fuller/`
**Scenario**: Complex, real-world application demonstrating advanced NES capabilities

Contains:
- **`task-manager-app/`**: Feature-rich React + TypeScript task manager application
  - Complete task management system with filtering, sorting, tags
  - React Context for state management
  - Custom hooks for task filtering
  - See [task-manager-app/README.md](5-Fuller/task-manager-app/README.md) for detailed scenarios

**Use Case**: Make changes to types, interfaces, enums, or component logic in a multi-file React app and observe how NES suggests updates across the component tree.

## Prerequisites

To work with all samples in this repository, you'll need:

- **Node.js** (v16 or higher) - for TypeScript and JavaScript samples
- **Python** (3.7 or higher) - for Python samples
- **Java** (JDK 11 or higher) - for Java samples
- **Maven** (3.6 or higher) - for building Java samples
- **C++ Compiler** (GCC/Clang with C++17 support) - for C++ samples
- **VS Code** - recommended for best NES experience
- **GitHub Copilot** - with Next Edit Suggestions enabled

## Setup Instructions

### General Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/bamurtaugh/NES-template.git
   cd NES-template
   ```

### Language-Specific Setup

#### TypeScript Samples
```bash
# For extension-sample
cd 2-Adding_Logic/extension-sample
npm install

# For task-manager-app
cd 5-Fuller/task-manager-app
npm install
```

#### JavaScript Samples
```bash
# For js-game
cd 3-Changing_Fixing_Logic/js-game
npm install
```

#### Java Samples
```bash
# For java-sample
cd 4-Refactoring/java-sample
mvn install
```

#### Python Samples
No additional setup required - Python standard library is sufficient for the game sample.

#### C++ Samples
No package installation required, but ensure you have a C++17 compatible compiler.

## Testing Instructions

### 1. Changing Intent (`1-Changing_Intent/`)

#### TypeScript - `geometry.ts`
```bash
# Compile and run
cd 1-Changing_Intent
npx tsc geometry.ts
node geometry.js

# Or use ts-node for direct execution
npx ts-node geometry.ts
```

**Try**: Rename the `getDistance()` method to `getDistanceFromOrigin()` and observe NES suggestions.

#### C++ - `stats.cpp`

This sample demonstrates a Statistics class with methods for calculating mean, standard deviation, and minimum values. Since this is a demonstration sample focused on NES capabilities, no runnable test is provided.

**How to use this sample**:
1. Open `stats.cpp` in VS Code with GitHub Copilot enabled
2. Review the existing method implementations (`getMean()`, `getStandardDeviation()`, `getMin()`)
3. Try adding a new method following the existing pattern, such as:
   ```cpp
   std::optional<double> Statistics::getMax() const
   {
   ```
4. Observe how NES suggests the complete implementation based on the patterns in existing methods
5. Try modifying the return type or parameter patterns and see how NES suggests updates throughout the class

**Try**: Add a new `getMax()` method and observe NES suggesting similar patterns to existing methods (empty check, iteration, return logic).

### 2. Adding Logic (`2-Adding_Logic/`)

#### Python - `game.py`
```bash
cd 2-Adding_Logic
python game.py
```

**Test the game**:
1. Enter player names when prompted
2. Take turns guessing numbers
3. Test win conditions (exact match or half the number)
4. Verify voting system for replaying

**Try**: Add a `difficulty` parameter to `play_game()` function and observe NES suggestions for related changes.

#### VS Code Extension - `extension-sample/`
```bash
cd 2-Adding_Logic/extension-sample

# Install dependencies
npm install

# Compile
npm run compile

# Lint the code
npm run lint

# Run in VS Code
# Press F5 to open Extension Development Host
# Then run "Hello World" command from Command Palette (Ctrl+Shift+P)
```

**Try**: Add a new command parameter to the `helloWorld` command registration and observe NES suggestions.

### 3. Changing/Fixing Logic (`3-Changing_Fixing_Logic/`)

#### TypeScript - `scenarios.ts`
```bash
cd 3-Changing_Fixing_Logic
npx ts-node scenarios.ts
```

**Try**: Change the `isPrime()` function logic (e.g., optimize the loop) and see NES suggestions.

#### JavaScript - `js-game/`
```bash
cd 3-Changing_Fixing_Logic/js-game

# Install dependencies
npm install

# Start the server
node index.js

# Open browser to http://localhost:3000
```

**Test the game**:
1. Navigate to http://localhost:3000
2. Enter 5-letter word guesses
3. Verify color feedback (green=correct position, yellow=wrong position, gray=not in word)

**Try**: Modify the word list or change the game logic in `index.js` and observe NES suggestions for related UI updates.

### 4. Refactoring (`4-Refactoring/`)

#### Java - `java-sample/`
```bash
cd 4-Refactoring/java-sample

# Clean and build
mvn clean install

# Run the application
mvn exec:java -Dexec.mainClass="com.mycompany.app.App"

# Run tests
mvn test

# Run a specific test
mvn test -Dtest=AppTest
```

**Try**: Refactor class names or method signatures in `App.java` and observe NES suggestions in test files.

### 5. Fuller Application (`5-Fuller/`)

#### React - `task-manager-app/`
```bash
cd 5-Fuller/task-manager-app

# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

**Test the application**:
1. App opens at http://localhost:3000
2. Create tasks with title, description, priority, and status
3. Add tags to tasks
4. Filter and sort tasks
5. Edit and delete tasks

**Try NES Scenarios** (see [task-manager-app/README.md](5-Fuller/task-manager-app/README.md) for detailed instructions):
- Add new fields to Task interface and observe suggestions across components
- Create enums and see NES suggest refactoring existing string literals
- Modify form validation and observe related changes
- Update switch statements and see pattern propagation

## Using This Template for NES Demonstrations

### Basic Workflow

1. **Choose a Scenario**: Pick a directory based on complexity and language preference
2. **Make an Initial Edit**: Modify a file (e.g., add a parameter, change a type, rename a method)
3. **Observe NES Suggestions**: GitHub Copilot should suggest related changes in other parts of the code
4. **Accept or Refine**: Review suggestions, accept relevant ones, and iterate

### Best Practices

- Start with simpler scenarios (1-Changing_Intent) before moving to complex ones (5-Fuller)
- Make small, focused changes to get precise NES suggestions
- Read the scenario-specific READMEs for detailed examples
- Use VS Code for the best NES experience with inline suggestions
- Enable GitHub Copilot and ensure NES feature is activated in your settings

## Example NES Demonstrations

### Example 1: Type Changes (Task Manager App)
1. Open `5-Fuller/task-manager-app/src/types/task.ts`
2. Add a new field: `isArchived: boolean;` to the Task interface
3. Observe NES suggesting to add it to TaskFormData type as well
4. Accept suggestions and see component updates

### Example 2: Parameter Addition (Python Game)
1. Open `2-Adding_Logic/game.py`
2. Add a `max_attempts` parameter to the `play_game()` function signature
3. Observe NES suggesting updates to the function calls in `main()`

### Example 3: Enum Creation (TypeScript)
1. Open `5-Fuller/task-manager-app/src/types/task.ts`
2. Create a TaskPriority enum: `enum TaskPriority { Low = 'low', Medium = 'medium', High = 'high' }`
3. Observe NES suggesting to update the priority field type in Task interface
4. Accept and see component logic suggestions using the enum

## Troubleshooting

### TypeScript Compilation Errors
- Ensure TypeScript is installed: `npm install -g typescript`
- Check tsconfig.json for proper configuration
- Run `npm install` in directories with package.json

### Python Import Errors
- Ensure Python 3.7+ is installed: `python --version`
- Use virtual environments if needed: `python -m venv venv`

### Java Build Failures
- Verify Java version: `java -version` (should be 11+)
- Verify Maven: `mvn -version`
- Clear Maven cache: `mvn clean`

### Node.js/npm Issues
- Update Node.js to v16+
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### NES Not Showing Suggestions
- Ensure GitHub Copilot extension is installed and activated
- Check that NES feature is enabled in GitHub Copilot settings
- Try making more significant changes (e.g., add parameters, change types)
- Ensure you're editing in a supported language and file type

## Contributing

Contributions are welcome! If you have additional scenarios or improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request with a clear description of the new scenario or improvement

## License

This project is licensed under the MIT License - see individual sample directories for specific license information where applicable.

## Additional Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [VS Code Extension API](https://code.visualstudio.com/api)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Support

For issues or questions about this template repository, please open an issue on GitHub.
