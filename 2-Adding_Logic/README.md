# 2-Adding_Logic

This folder contains examples for adding new logic and functionality to existing codebases.

## Files

### `game.py`
A Python implementation of a two-player number guessing game with the following features:
- **Interactive gameplay** - Two players take turns guessing a randomly generated number (2-100)
- **Multiple win conditions** - Players can win by guessing the exact number or a number that when doubled equals the target
- **Fallback scoring** - If no one wins exactly, the closest guess without going over wins
- **Replay functionality** - Players can choose to play multiple rounds
- **Input validation** - Handles invalid inputs gracefully

**How to run:**
```bash
python game.py
```

### `extension-sample/`
A complete VS Code extension sample that demonstrates:
- Basic extension structure and configuration
- Command registration and execution
- VS Code API usage for displaying information messages

See the [extension-sample README](./extension-sample/README.md) for detailed setup and usage instructions.

## Purpose
This folder demonstrates scenarios where you need to add new logic, features, or entire components to expand functionality, such as implementing new game mechanics, adding user interactions, or creating development tools.