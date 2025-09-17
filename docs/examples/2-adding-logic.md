# 2-Adding_Logic: Adding New Features

This category demonstrates how NES helps when you add new functionality to existing code. These examples show how Copilot can suggest related infrastructure, configuration changes, and supporting code when you introduce new features.

## Overview

**Scenario**: Adding new features or capabilities to existing applications
**NES Benefit**: Suggests related infrastructure, configuration, and supporting code
**Difficulty**: ⭐⭐ Intermediate

## Examples in This Category

### 🔧 VS Code Extension (`extension-sample/`)
**Language**: TypeScript/JavaScript
**Scenario**: Adding new commands and functionality to a VS Code extension
**Files**: `extension.ts`, `package.json`, various configuration files

### 🎮 Number Guessing Game (`game.py`)
**Language**: Python
**Scenario**: Adding new game features like scoring, multiplayer, or difficulty levels
**Files**: `game.py`

---

## Example 1: VS Code Extension (extension-sample/)

### What You'll Learn
- How NES handles extension configuration changes
- Updating package.json when adding commands
- Managing command registration and implementation
- Working with VS Code API patterns

### Prerequisites
- Basic TypeScript/JavaScript knowledge
- Familiarity with VS Code extensions
- Node.js development environment
- VS Code with extension development setup

### Current State
The extension currently has a simple "Hello World" command that shows an information message.

### Extension Structure
```
extension-sample/
├── src/
│   └── extension.ts      # Main extension code
├── package.json          # Extension manifest
├── README.md            # Documentation
└── other config files
```

### Step-by-Step Instructions

#### Step 1: Set Up Development Environment
1. Open the `2-Adding_Logic/extension-sample/` directory
2. Run `npm install` to install dependencies
3. Open in VS Code and ensure Copilot is active

#### Step 2: Add a New Command Function
In `src/extension.ts`, add a new command function:

```typescript
// Add this function near the existing helloWorld command
function showCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    vscode.window.showInformationMessage(`Current time: ${timeString}`);
}
```

#### Step 3: Observe NES Suggestions
After adding the function, NES should suggest:
- Registering the command in the `activate` function
- Adding the command to `package.json` contributions
- Potentially adding keyboard shortcuts or menu items

#### Step 4: Register the Command
Add the command registration in the `activate` function:

```typescript
export function activate(context: vscode.ExtensionContext) {
    // Existing code...
    
    // Add this new command registration
    let timeCommand = vscode.commands.registerCommand('extension-sample.showTime', showCurrentTime);
    context.subscriptions.push(timeCommand);
}
```

#### Step 5: Update package.json
NES should suggest updating the `contributes.commands` section in `package.json`:

```json
{
    "contributes": {
        "commands": [
            {
                "command": "extension-sample.helloWorld",
                "title": "Hello World"
            },
            {
                "command": "extension-sample.showTime",
                "title": "Show Current Time"
            }
        ]
    }
}
```

### Expected NES Behavior

**When adding the function**:
- Suggests command registration pattern
- Proposes consistent naming conventions
- May suggest error handling patterns

**When registering the command**:
- Suggests updating package.json
- Proposes keyboard shortcuts
- May suggest menu contributions

**When updating package.json**:
- Suggests consistent command structure
- Proposes activation events
- May suggest categories or icons

### Advanced Scenarios to Try

#### 1. Add Command with Parameters
```typescript
function greetUser(name?: string) {
    const userName = name || 'User';
    vscode.window.showInformationMessage(`Hello, ${userName}!`);
}
```

#### 2. Add Configuration Settings
In `package.json`, add configuration:
```json
{
    "contributes": {
        "configuration": {
            "title": "Extension Sample",
            "properties": {
                "extensionSample.greeting": {
                    "type": "string",
                    "default": "Hello",
                    "description": "Default greeting message"
                }
            }
        }
    }
}
```

#### 3. Add Menu Items
```json
{
    "contributes": {
        "menus": {
            "editor/context": [
                {
                    "command": "extension-sample.showTime",
                    "group": "navigation"
                }
            ]
        }
    }
}
```

---

## Example 2: Number Guessing Game (game.py)

### What You'll Learn
- Adding features to Python applications
- NES suggestions for game logic
- Managing state and configuration changes
- Error handling and validation patterns

### Prerequisites
- Basic Python knowledge
- Understanding of game development concepts
- Python development environment

### Current State
The game is a simple number guessing game with basic functionality.

### Step-by-Step Instructions

#### Step 1: Examine Current Game
1. Open `2-Adding_Logic/game.py`
2. Run the game to understand current functionality
3. Identify areas for enhancement

#### Step 2: Add Score Tracking
Add a scoring system to the game:

```python
class GameStats:
    def __init__(self):
        self.games_played = 0
        self.total_guesses = 0
        self.best_score = float('inf')
    
    def update_stats(self, guesses):
        self.games_played += 1
        self.total_guesses += guesses
        self.best_score = min(self.best_score, guesses)
```

#### Step 3: Observe NES Suggestions
NES should suggest:
- Integrating the stats class into the main game loop
- Adding methods to display statistics
- Updating the game flow to track attempts

#### Step 4: Add Difficulty Levels
```python
DIFFICULTY_SETTINGS = {
    'easy': {'range': 50, 'max_attempts': 10},
    'medium': {'range': 100, 'max_attempts': 7},
    'hard': {'range': 200, 'max_attempts': 5}
}

def select_difficulty():
    print("Select difficulty:")
    for difficulty in DIFFICULTY_SETTINGS:
        print(f"- {difficulty}")
    # Implementation
```

### Expected NES Behavior

**When adding classes**:
- Suggests integration with existing code
- Proposes consistent method patterns
- May suggest data persistence

**When adding difficulty settings**:
- Suggests updating game initialization
- Proposes user interface changes
- May suggest configuration validation

### Advanced Features to Try

1. **Save/Load High Scores**
2. **Multiplayer Support**
3. **Different Game Modes**
4. **Hint System**
5. **Time Limits**

---

## Best Practices for Adding Logic

### 1. Plan the Integration
- Consider how new features connect to existing code
- Think about configuration and setup requirements
- Plan for error handling and edge cases

### 2. Follow Established Patterns
- Use consistent naming conventions
- Follow the existing code structure
- Maintain the same error handling style

### 3. Update Supporting Infrastructure
- Accept NES suggestions for configuration changes
- Update documentation and help text
- Consider testing and validation needs

### 4. Consider User Experience
- Think about discoverability of new features
- Plan for appropriate user feedback
- Consider accessibility and usability

---

## Common NES Patterns in Adding Logic

### Configuration Updates
When you add functionality, NES often suggests:
- Updating configuration files
- Adding new settings or options
- Modifying initialization code

### Registration and Discovery
For features that need registration:
- Command registration patterns
- Event handler setup
- Menu and UI integration

### Error Handling
New features often require:
- Input validation
- Error recovery mechanisms
- Graceful degradation

### Documentation
NES frequently suggests:
- Updating help text
- Adding inline documentation
- Modifying README files

---

## Troubleshooting

**Problem**: NES suggestions seem too conservative
**Solution**: Make more substantial changes to establish clearer patterns

**Problem**: No suggestions for configuration updates
**Solution**: Open configuration files in your editor for additional context

**Problem**: Suggestions don't match your architecture
**Solution**: Establish patterns first, then NES will follow them

---

## Next Steps

After mastering adding logic:
1. Explore [Changing & Fixing Logic examples](./3-changing-fixing-logic.md)
2. Try adding features to your own projects
3. Apply these patterns to different frameworks and languages

The key insight from this category is that NES understands **feature integration patterns** and can help ensure new functionality is properly connected to existing infrastructure.