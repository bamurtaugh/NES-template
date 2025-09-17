# Getting Started with NES Templates

This guide will help you effectively use the NES (Next Edit Suggestions) template examples to learn and demonstrate GitHub Copilot's intelligent code suggestions.

## Prerequisites

Before you begin, ensure you have:

1. **GitHub Copilot Subscription**: You need an active GitHub Copilot subscription
2. **Supported IDE**: VS Code, Visual Studio, JetBrains IDEs, or Neovim with Copilot extension
3. **GitHub Copilot Enabled**: Make sure the Copilot extension is installed and active

## Setting Up Your Environment

### VS Code Setup
1. Install the [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
2. Sign in with your GitHub account
3. Verify Copilot is active (check the status bar)

### Enabling Next Edit Suggestions
Next Edit Suggestions may require specific settings or preview features. Check your Copilot settings to ensure you have the latest features enabled.

## How to Use These Examples

### Step 1: Choose Your Starting Point

| If you want to... | Start with... |
|-------------------|---------------|
| Learn basic NES concepts | `1-Changing_Intent/` |
| Add new features to existing code | `2-Adding_Logic/` |
| Fix bugs and improve logic | `3-Changing_Fixing_Logic/` |
| Restructure and clean up code | `4-Refactoring/` |
| See a complete real-world example | `5-Fuller/` |

### Step 2: Follow the Pattern

Each example follows this pattern:

1. **Read the README**: Each directory has specific instructions
2. **Open the Files**: Load the example files in your IDE
3. **Make the Suggested Edit**: Follow the specific edit instructions
4. **Observe NES**: Watch how Copilot suggests related changes
5. **Accept or Refine**: Use the suggestions or modify them as needed

### Step 3: Experiment

- Try variations of the suggested edits
- See how NES adapts to different contexts
- Compare suggestions across different programming languages

## Understanding NES Behavior

### What Triggers NES
- Making a specific code change
- Adding new functionality
- Modifying existing patterns
- Refactoring code structure

### Types of Suggestions You'll See
- **Related Changes**: Updates to related code that should change together
- **Pattern Completion**: Completing established patterns in your codebase
- **Error Prevention**: Suggestions to avoid common mistakes
- **Best Practices**: Improvements that follow coding standards

## Tips for Success

### 1. Start Small
Begin with simple examples in `1-Changing_Intent/` before moving to complex scenarios.

### 2. Pay Attention to Context
NES suggestions are based on the context of your entire file and project. The more context Copilot has, the better the suggestions.

### 3. Iterate and Experiment
Try the same change in different ways to see how NES responds. Each approach may yield different suggestions.

### 4. Read the Comments
Examples include comments explaining what to expect and why certain suggestions appear.

## Troubleshooting

### NES Not Working?
- Verify Copilot is active and connected
- Check that you're making the exact changes suggested in the examples
- Ensure you have the latest Copilot extension version
- Try refreshing the IDE or restarting Copilot

### Not Seeing Expected Suggestions?
- Give Copilot a moment to analyze your changes
- Make sure you're following the example instructions precisely
- Check that related files are open in your editor for better context

### Different Suggestions Than Expected?
This is normal! NES suggestions can vary based on:
- Your local context and recent edits
- The overall project structure
- Your coding patterns and history

## Next Steps

1. **Start with Example 1**: Begin with `1-Changing_Intent/stats.cpp`
2. **Work Through Each Category**: Progress through examples 1-5
3. **Apply to Your Projects**: Use these patterns in your own code
4. **Share Your Experience**: Note how NES helps in your development workflow

## Getting Help

- Check the individual example READMEs for specific guidance
- Review the [NES Overview](./nes-overview.md) for conceptual understanding
- Refer to [Best Practices](./best-practices.md) for optimization tips

---

Ready to get started? Head to [`1-Changing_Intent/`](../1-Changing_Intent/) for your first NES example!