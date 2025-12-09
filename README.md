# NES-template: Copilot Next Edit Suggestions Examples

This repository contains a collection of code samples designed to demonstrate the capabilities of **Copilot Next Edit Suggestions (NES)**. Each example showcases how NES can intelligently suggest related edits across your codebase when you make an initial change.

## What is Copilot Next Edit Suggestions?

Copilot Next Edit Suggestions (NES) is a feature that helps developers by anticipating and suggesting related code changes when you make an edit. When you modify code in one location, NES analyzes your codebase and proposes additional edits in related areas, saving time and reducing errors.

## Repository Structure

This repository is organized into five directories, each containing progressively more complex examples:

### 1. **1-Changing_Intent** - Simple Intent Changes
Contains basic examples for understanding how small changes can trigger related suggestions:
- `geometry.ts` - TypeScript class for geometric calculations
- `stats.cpp` - C++ statistics functions

### 2. **2-Adding_Logic** - Adding New Functionality
Examples demonstrating how NES helps when adding new features:
- `extension-sample/` - VS Code extension Hello World sample
- `game.py` - Python game logic implementation

### 3. **3-Changing_Fixing_Logic** - Modifying and Fixing Code
Real-world scenarios for changing and debugging existing code:
- `js-game/` - JavaScript/Node.js game application
- `scenarios.ts` - TypeScript function examples with various patterns

### 4. **4-Refactoring** - Code Refactoring Examples
Demonstrates how NES assists with refactoring tasks:
- `java-sample/` - Java application for refactoring demonstrations

### 5. **5-Fuller** - Full Application Example
A complete, feature-rich application for advanced NES demonstrations:
- `task-manager-app/` - React + TypeScript task manager application

## Getting Started

### Prerequisites

Depending on which example you want to explore, you may need:
- **TypeScript/JavaScript examples**: Node.js and npm
- **Python examples**: Python 3.x
- **C++ examples**: A C++ compiler (g++, clang, etc.)
- **Java examples**: JDK 11 or higher
- **VS Code Extension examples**: Visual Studio Code

### Using the Examples

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/NES-template.git
   cd NES-template
   ```

2. **Navigate to an example directory**:
   ```bash
   cd 1-Changing_Intent
   # or any other directory
   ```

3. **Follow the specific instructions** in each subdirectory's README (where available) or experiment with making changes to see NES suggestions.

## Example Scenarios

Each directory contains files designed to trigger specific NES behaviors:

### Simple Changes (Directory 1)
Make a small change and observe how NES suggests related updates across the file.

### Adding Features (Directory 2)
Add a new parameter or function and see how NES suggests updates to callers and related code.

### Fixing Bugs (Directory 3)
Fix a bug or change logic and watch NES identify other places that need similar fixes.

### Refactoring (Directory 4)
Rename variables, extract methods, or restructure code and see how NES propagates changes.

### Full Application (Directory 5)
Work with a complete task manager app that demonstrates NES in a real-world context:
- Add new fields to TypeScript interfaces
- Convert conditional logic to switch statements
- Update function signatures
- And more!

See the [task-manager-app README](5-Fuller/task-manager-app/README.md) for specific scenarios.

## Tips for Exploring NES

1. **Start small**: Begin with examples in directory 1 before moving to more complex ones
2. **Make intentional changes**: Try the specific edits suggested in individual README files
3. **Review suggestions carefully**: NES provides intelligent suggestions, but you should always review them
4. **Experiment**: Try your own changes to see what suggestions NES provides

## Contributing

This is a template repository designed for demonstration purposes. Feel free to fork it and create your own examples!

## License

This project is provided as-is for educational and demonstration purposes.

## Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [VS Code API Documentation](https://code.visualstudio.com/api)
