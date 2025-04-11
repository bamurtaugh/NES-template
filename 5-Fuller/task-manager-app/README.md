# Task Manager App: Copilot Next Edit Suggestions Demo

This project serves as an advanced and relatable example of how Copilot Next Edit Suggestions (NES) can help with real-world development tasks. The application is a feature-rich task manager built with React and TypeScript.

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

### Scenario 1: [`TaskForm.tsx`](/5-Fuller/task-manager-app/src/components/TaskForm.tsx)

1. On line 88: Add a new showConfirmation parameter to the handleRemoveTag function:

   ```
   const handleRemoveTag = (tagToRemove: string, showConfirmation: boolean = false) => {
   ```

   NES should suggest updating the onClick handler in the JSX and adding confirmation logic.

2. Above line 50: Change the validateForm method to check for minimum description length:

   ```
   if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
   }
   ```

   NES should identify that the existing condition also checks description and suggest combining the two conditions into a more elegant solution.

### Scenario 2: [`useTaskFilters.ts`](/5-Fuller/task-manager-app/src/hooks/useTaskFilters.ts)

1. Line 134: Update the `if` to a `switch`
   
   NES should suggest how to use use `switch` syntax for the comparisons.

### Scenario 3: [`task.ts`](/5-Fuller/task-manager-app/src/types/task.ts)

1. Line 13: Add a new field in the Task interface like `isArchived: boolean;`
   
   NES should suggest adding it to the TaskFormData type as well.

2. End of file: Create a TaskStatus type alias for the status field values:

   ```   
   type TaskStatus = 'todo' | 'in-progress' | 'completed';
   ```

   NES should suggest updating the status field in Task to use this type.

3. Top of file: Add a TaskPriority enum above the Task interface:
   
   ```
   enum TaskPriority { Low = 'low', Medium = 'medium', High = 'high' }
   ```

   NES should suggest updating the priority field to use this enum.

### Scenario 4: [`TaskItem.tsx`](/5-Fuller/task-manager-app/src/components/TaskItem.tsx)

1. Line 25: Add an `enum taskPriority` 

   NES should suggest updates to the priority comparison logic to use the enum (i.e. `TaskPriority.HIGH` instead of `high`). 
   
   It should also suggest to create an enum for `taskStatus` and then use it in the status comparison logic.

2. Switch statement starting line 39: Modify the task status rendering to use emojis and friendlier language.

   Change from:
   ```
   return 'status-completed';
   ```

   to:
   ```
   return 'Task completed! ✅';
   ```

   NES should suggest similar updates throughout the rest of the switch statement.