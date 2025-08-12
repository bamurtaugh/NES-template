# NES (Next Edit Suggestions) Template Repository

Welcome to the **NES Template Repository**! This repository provides a comprehensive collection of coding scenarios designed to demonstrate and test GitHub Copilot's Next Edit Suggestions (NES) capabilities across different programming languages and complexity levels.

> 📓 **For a more detailed, interactive guide, see [README.ipynb](README.ipynb)**

## 🎯 Purpose

This template repository serves as:
- **Training examples** for understanding how Copilot NES works in various scenarios
- **Testing scenarios** for validating NES suggestions across different coding patterns
- **Learning resource** for developers exploring AI-assisted coding workflows
- **Reference implementations** for common coding scenarios and refactoring patterns

## 📁 Repository Structure

The repository is organized into **5 main categories**, each representing different types of coding scenarios:

```
NES-template/
├── 1-Changing_Intent/     # Scenarios for changing code purpose/behavior
├── 2-Adding_Logic/        # Scenarios for adding new functionality
├── 3-Changing_Fixing_Logic/ # Scenarios for fixing bugs and modifying logic
├── 4-Refactoring/         # Scenarios for code refactoring and improvement
└── 5-Fuller/              # Complex, real-world application scenarios
```

## 🚀 Quick Start

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd NES-template
   ```

2. **Open in VS Code** with Copilot enabled:
   ```bash
   code .
   ```

3. **Choose a category** and start exploring:
   - `1-Changing_Intent/` - Simple modifications (C++, TypeScript)
   - `2-Adding_Logic/` - Adding features (Python game, VS Code extension)
   - `3-Changing_Fixing_Logic/` - Bug fixes (JavaScript game, TypeScript utilities)
   - `4-Refactoring/` - Code improvements (Java dev container)
   - `5-Fuller/` - Complex apps (React/TypeScript task manager)

## 💡 Quick Examples

### JavaScript Game (3-Changing_Fixing_Logic/js-game)
```bash
cd 3-Changing_Fixing_Logic/js-game
node index.js
# Open http://localhost:3000
# (Dependencies are already installed)
```

### React Task Manager (5-Fuller/task-manager-app)
```bash
cd 5-Fuller/task-manager-app
npm install && npm start
# Open http://localhost:3000
```

### VS Code Extension (2-Adding_Logic/extension-sample)
```bash
cd 2-Adding_Logic/extension-sample
npm install
# Press F5 in VS Code to run
```

## 🛠️ Development Options

- **GitHub Codespaces**: Click "Code" → "Codespaces" → "Create codespace"
- **Local Dev**: Install Node.js, Python, Java, C++ tools
- **Dev Containers**: Use VS Code Dev Containers extension

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your scenario in the appropriate category
4. Submit a pull request

## 📚 Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Interactive README Notebook](README.ipynb)
- Individual project READMEs in each directory

---

*Happy coding with GitHub Copilot Next Edit Suggestions! 🚀*