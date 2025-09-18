# NES Template Repository

This repository contains a collection of code examples and templates designed to demonstrate GitHub Copilot's **Next Edit Suggestions (NES)** feature. The examples span multiple programming languages and scenarios to showcase how Copilot can intelligently suggest related changes when you modify code.

## What is Next Edit Suggestions (NES)?

Next Edit Suggestions is a GitHub Copilot feature that analyzes your current code changes and proactively suggests related modifications you might need to make elsewhere in your codebase. This helps maintain consistency and completeness when refactoring or updating code.

## Repository Structure

This repository is organized into different directories, each focusing on specific types of code changes and scenarios:

### 📝 `1-Changing_Intent/`
Examples that demonstrate how NES can suggest related changes when you modify the intent or behavior of code.

- **`geometry.ts`** - TypeScript class with geometric calculations
- **`stats.cpp`** - C++ statistics class with mathematical operations

### ➕ `2-Adding_Logic/`
Examples showing how NES suggests complementary code when you add new functionality.

- **`extension-sample/`** - VS Code extension sample with Hello World functionality
- **`game.py`** - Python two-player guessing game with interactive features

### 🔧 `3-Changing_Fixing_Logic/`
Scenarios focused on fixing bugs or changing existing logic and the related suggestions NES provides.

- **`js-game/`** - JavaScript Wordle-like game with Express.js backend
- **`scenarios.ts`** - TypeScript functions demonstrating various programming patterns

### 🔄 `4-Refactoring/`
Examples that showcase how NES can help during refactoring operations.

- **`java-sample/`** - Complete Java development container sample with Maven setup

### 🎯 `5-Fuller/`
More comprehensive, real-world examples that demonstrate NES in complex scenarios.

- **`task-manager-app/`** - Full React + TypeScript task management application

## Getting Started

### Prerequisites

- **GitHub Copilot** subscription and VS Code extension
- **Next Edit Suggestions** feature enabled in your Copilot settings
- Relevant development environments for the languages you want to explore:
  - Node.js (for JavaScript/TypeScript examples)
  - Python 3.x (for Python examples)
  - Java 11+ and Maven (for Java examples)
  - C++ compiler (for C++ examples)

### Using the Examples

1. **Clone this repository:**
   ```bash
   git clone https://github.com/bamurtaugh/NES-template.git
   cd NES-template
   ```

2. **Navigate to any example directory:**
   ```bash
   cd 2-Adding_Logic/extension-sample
   ```

3. **Follow the specific README instructions** in each subdirectory for setup and usage.

4. **Make the suggested changes** described in the individual README files to trigger NES suggestions.

### Example Workflow

1. Open a file from any of the example directories
2. Make the specific code changes mentioned in the directory's README
3. Observe how GitHub Copilot suggests related changes in other parts of the code
4. Accept or modify the suggestions to see the full power of NES

## Language Support

This repository includes examples in:

- **TypeScript/JavaScript** - Modern web development patterns
- **Python** - Interactive applications and algorithms
- **Java** - Enterprise development with Maven
- **C++** - Systems programming and mathematical computations

## Contributing

We welcome contributions to expand the collection of NES examples! When contributing:

1. **Follow the existing directory structure** (`X-Category_Name/`)
2. **Include a comprehensive README** in your example directory explaining:
   - What changes to make to trigger NES
   - Expected suggestions Copilot should provide
   - Learning objectives for the example
3. **Ensure examples are educational** and demonstrate clear NES scenarios
4. **Test your examples** with GitHub Copilot to verify NES behavior

### Adding New Examples

1. Create a new directory following the naming convention
2. Add your code files with clear, educational examples
3. Include a detailed README explaining the NES scenarios
4. Submit a pull request with a description of the new scenarios

## Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [VS Code Extension Development](https://code.visualstudio.com/api)
- [Development Containers](https://containers.dev/)

## License

This project is licensed under the MIT License - see individual example directories for specific license information where applicable.

## Feedback

If you have ideas for new NES scenarios or improvements to existing examples, please open an issue or submit a pull request. Your feedback helps make these templates more useful for the developer community!