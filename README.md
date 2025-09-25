# NES Template - Next Edit Suggestions Examples

This repository provides a comprehensive collection of examples and scenarios to demonstrate GitHub Copilot's Next Edit Suggestions (NES) feature. Each directory contains carefully crafted code examples designed to showcase different aspects of AI-assisted code editing and refactoring.

## Project Structure

```
NES-template/
├── 1-Changing_Intent/          # Examples of changing function behavior and intent
│   ├── stats.cpp              # Statistical functions with intentional modifications
│   └── geometry.ts            # Geometric calculations
├── 2-Adding_Logic/             # Examples of adding new functionality
│   └── extension-sample/      # VS Code extension sample project
├── 3-Changing_Fixing_Logic/    # Examples of fixing and modifying existing logic
│   ├── js-game/              # JavaScript game implementation
│   └── scenarios.ts          # TypeScript function scenarios
├── 4-Refactoring/             # Examples of code refactoring scenarios
│   └── java-sample/          # Java development container sample
├── 5-Fuller/                  # More complex, real-world scenarios
│   └── task-manager-app/     # React TypeScript task management application
└── .github/prompts/          # GitHub Copilot prompt templates
```

## Description

This template repository serves as a training and demonstration platform for GitHub Copilot's Next Edit Suggestions feature. It contains various programming scenarios across multiple languages including:

- **C++**: Statistical calculations and geometric functions
- **TypeScript/JavaScript**: Extension development, game logic, and utility functions  
- **Java**: Development container setup and basic applications
- **React/TypeScript**: Full-featured task management application

Each scenario is designed to trigger specific types of AI suggestions, helping developers understand how to effectively use Copilot's predictive editing capabilities.

## Installation

### Prerequisites

- Git
- Your preferred code editor (VS Code recommended for best Copilot experience)
- GitHub Copilot subscription and extension installed
- Language-specific tools as needed:
  - Node.js and npm (for JavaScript/TypeScript projects)
  - Java Development Kit (for Java projects) 
  - C++ compiler (for C++ projects)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/bamurtaugh/NES-template.git
   cd NES-template
   ```

2. Navigate to the specific scenario you want to explore:
   ```bash
   cd 1-Changing_Intent  # or any other directory
   ```

3. Follow the setup instructions in each subdirectory's README file for language-specific requirements.

## Usage

### Getting Started with NES Examples

1. **Choose a Scenario**: Select from the numbered directories based on the type of editing scenario you want to explore.

2. **Open in VS Code**: Open the specific directory in VS Code to activate Copilot suggestions:
   ```bash
   code 1-Changing_Intent/
   ```

3. **Follow the Prompts**: Each subdirectory contains specific instructions and scenarios designed to trigger Next Edit Suggestions.

### Scenario Descriptions

#### 1-Changing_Intent/
Focus on modifying the behavior and intent of existing functions. Examples include changing statistical calculation methods and geometric function implementations.

#### 2-Adding_Logic/
Practice adding new functionality to existing codebases. Includes a VS Code extension sample where you can add new commands and features.

#### 3-Changing_Fixing_Logic/
Learn to identify and fix logical errors while improving code quality. Contains JavaScript game logic and TypeScript utility functions.

#### 4-Refactoring/
Explore code refactoring scenarios with the Java development container sample, focusing on improving code structure and maintainability.

#### 5-Fuller/
Work with a complete React TypeScript application (task manager) that demonstrates real-world development scenarios and complex refactoring opportunities.

### Best Practices for Using NES

- Make small, incremental changes to trigger more accurate suggestions
- Review suggestions carefully before accepting
- Use descriptive variable names and comments to provide context
- Experiment with different approaches to see varied suggestions

## Contributing

We welcome contributions to improve the NES template examples! Here's how you can contribute:

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-scenario`)
3. Add your scenario or improvements
4. Ensure your code follows the existing patterns and includes appropriate documentation
5. Test your scenarios with GitHub Copilot to verify they produce useful suggestions
6. Submit a pull request with a clear description of your changes

### Contribution Guidelines

- Each new scenario should include clear documentation of the intended NES behavior
- Code should be well-commented to provide context for AI suggestions
- Include README files for complex scenarios
- Test scenarios across different programming languages when applicable
- Follow existing naming conventions and directory structure

### Types of Contributions Welcome

- New programming language examples
- Additional refactoring scenarios
- Bug fixes in existing examples
- Documentation improvements
- Performance optimizations that maintain teaching value

## License

Copyright © Microsoft Corporation All rights reserved.

Licensed under the MIT License. See LICENSE in the project root for license information.

## Additional Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [VS Code Extension Development](https://code.visualstudio.com/api)
- [Development Containers](https://containers.dev/)

---

For questions or support, please open an issue in this repository or refer to the GitHub Copilot documentation.