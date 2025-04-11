# Task Manager App: Copilot Next Edit Suggestions Demo

This project serves as an advanced and relatable example of how Copilot Next Edit Suggestions (NES) can help with real-world development tasks. The application is a feature-rich task manager built with React and TypeScript.

## Purpose

This example demonstrates how Copilot Next Edit Suggestions can assist with:

1. **Type Definitions and Interfaces**
   - Adding new fields to existing types
   - Modifying validation rules
   - Creating derived types

2. **State Management**
   - Adding new methods to context providers
   - Enhancing existing state management logic
   - Implementing persistence strategies

3. **Component Development**
   - Adding new features to existing components
   - Implementing different display modes
   - Adding conditional rendering based on props/state
   - Implementing accessibility improvements

4. **Custom Hooks**
   - Extracting complex logic into reusable hooks
   - Adding new filtering options
   - Implementing advanced search capabilities
   - Optimizing performance with memoization

5. **Form Handling**
   - Adding validation rules
   - Implementing dynamic form fields
   - Adding complex state updates

## Project Structure

```
task-manager-app/
├── public/
├── src/
│   ├── components/
│   │   ├── App.tsx           # Main application component
│   │   ├── TaskForm.tsx      # Form for creating/editing tasks
│   │   ├── TaskItem.tsx      # Individual task display component
│   │   └── TaskList.tsx      # List of tasks with filtering/sorting
│   ├── context/
│   │   └── TaskContext.tsx   # Task state management with React Context
│   ├── hooks/
│   │   └── useTaskFilters.ts # Custom hook for filtering and sorting tasks
│   ├── types/
│   │   └── task.ts           # TypeScript interfaces for tasks
│   ├── utils/
│   ├── index.tsx             # Application entry point
│   └── styles.css            # Application styling
├── package.json
└── tsconfig.json
```

## How to Use This Example

### Scenario 1: Adding New Fields to Task Interface

The `Task` interface in `types/task.ts` shows how NES can help when you need to add new fields to your data models. For example, adding an `assignedTo` field would require updates to:
- The Task interface
- The form component
- The display component
- The filtering logic

### Scenario 2: Enhancing Filtering Capabilities

The `useTaskFilters.ts` custom hook demonstrates how NES can help with:
- Adding new filter criteria
- Implementing complex filtering logic
- Optimizing performance for large data sets

### Scenario 3: Adding Form Validation

The `TaskForm.tsx` component shows how NES can help with:
- Adding validation rules for form fields
- Implementing error messages
- Creating a better user experience

### Scenario 4: Improving Component Display

The `TaskItem.tsx` component demonstrates how NES can help with:
- Adding different view modes
- Implementing conditional rendering
- Adding accessibility improvements

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm start
   ```

## NES Annotation Strategy

Throughout this codebase, you'll find comments explaining how NES can help with specific development tasks. These annotations highlight areas where Copilot Next Edit Suggestions would be most valuable, providing a guide for demonstrating NES capabilities in real-world scenarios.

## Example NES Workflow

1. **Start with:** "I need to add an assignee field to tasks"
2. **NES will generate:** Updates to the Task interface, form fields, display components, and filtering logic
3. **Result:** A complete implementation with all necessary changes across multiple files
