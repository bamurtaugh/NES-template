# Task Manager App: Copilot Next Edit Suggestions Demo

This project serves as an advanced and relatable example of how Copilot Next Edit Suggestions (NES) can help with real-world development tasks. The application is a feature-rich task manager built with React and TypeScript.

## ✨ Features

- **Complete Task Management**: Create, edit, delete, and organize tasks
- **Advanced Filtering**: Filter by status, priority, and search through tasks
- **Task Statistics Dashboard**: Visual overview of task progress and priorities
- **Sample Data**: Automatically loads realistic sample tasks for demonstration
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Keyboard Shortcuts**: Quick actions with Ctrl+N (new task) and Ctrl+K (search)
- **Local Storage**: Tasks persist between browser sessions
- **Modern UI**: Clean, professional design with smooth animations

## 🚀 How to Run

### Prerequisites
- Node.js 16 or higher
- npm or yarn package manager

### Installation & Setup

1. **Navigate to the project directory:**
   ```bash
   cd 5-Fuller/task-manager-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the app

### Available Scripts

- `npm start` - Start the development server
- `npm build` - Create a production build
- `npm test` - Run the test suite
- `npm run eject` - Eject from Create React App (one-way operation)

## 🎯 What Makes This Interesting

### 1. **Real-World Functionality**
- Comprehensive task management with priorities, due dates, and tags
- Advanced filtering and sorting capabilities
- Statistics dashboard showing task completion rates and priorities

### 2. **Modern Development Practices**
- TypeScript for type safety
- React Hooks for state management
- Context API for global state
- Custom hooks for reusable logic
- Responsive CSS Grid and Flexbox layouts

### 3. **User Experience Features**
- Keyboard shortcuts for power users
- Smooth animations and transitions
- Expandable task details
- Intuitive status updates via dropdown
- Sample data for immediate testing

### 4. **Copilot NES Demonstration**
The app includes specific scenarios designed to showcase NES capabilities:
- Complex form validation and state management
- TypeScript interface extensions
- Component refactoring opportunities
- Performance optimization scenarios

## 📁 Project Structure

```
task-manager-app/
├── public/
│   └── index.html          # Main HTML template
├── src/
│   ├── components/
│   │   ├── App.tsx         # Main application component
│   │   ├── TaskForm.tsx    # Form for creating/editing tasks
│   │   ├── TaskItem.tsx    # Individual task display component
│   │   ├── TaskList.tsx    # List of tasks with filtering/sorting
│   │   └── TaskStatistics.tsx # Dashboard with task statistics
│   ├── context/
│   │   └── TaskContext.tsx # Task state management with React Context
│   ├── hooks/
│   │   └── useTaskFilters.ts # Custom hook for filtering and sorting tasks
│   ├── types/
│   │   └── task.ts         # TypeScript interfaces for tasks
│   ├── utils/
│   │   ├── sampleData.ts   # Sample task data generator
│   │   └── keyboardShortcuts.tsx # Keyboard shortcuts functionality
│   ├── index.tsx           # Application entry point
│   └── styles.css          # Application styling
├── package.json
└── tsconfig.json
```

## 🛠 Technology Stack

- **React 18** - UI library with hooks and modern patterns
- **TypeScript** - Type-safe JavaScript with excellent developer experience
- **Create React App** - Zero-config build setup
- **date-fns** - Modern date utility library
- **uuid** - Unique identifier generation
- **CSS3** - Modern styling with CSS Grid, Flexbox, and animations

## 🎪 NES Demo Scenarios

### Scenario 1: [`TaskForm.tsx`](/5-Fuller/task-manager-app/src/components/TaskForm.tsx)

1. Line 88: Add a new `showConfirmation` parameter to the `handleRemoveTag` function:

   ```typescript
   const handleRemoveTag = (tagToRemove: string, showConfirmation: boolean = false) => {
   ```

   NES should suggest updating the onClick handler in the JSX and adding confirmation logic.

2. Above line 50: Change the validateForm method to check for minimum description length:

   ```typescript
   if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
   }
   ```

   NES should identify that the existing condition also checks description and suggest combining the two conditions into a more elegant solution.

### Scenario 2: [`useTaskFilters.ts`](/5-Fuller/task-manager-app/src/hooks/useTaskFilters.ts)

1. Line 134: Update the `if` to a `switch`.
   
   NES should suggest how to use `switch` syntax for the comparisons.

### Scenario 3: [`task.ts`](/5-Fuller/task-manager-app/src/types/task.ts)

1. Line 13: Add a new field in the Task interface like `isArchived: boolean;`
   
   NES should suggest adding it to the TaskFormData type as well.

2. End of file: Create a TaskStatus type alias for the status field values:

   ```typescript   
   type TaskStatus = 'todo' | 'in-progress' | 'completed';
   ```

   NES should suggest updating the status field in Task to use this type.

3. Top of file: Add a TaskPriority enum above the Task interface:
   
   ```typescript
   enum TaskPriority { Low = 'low', Medium = 'medium', High = 'high' }
   ```

   NES should suggest updating the priority field to use this enum.

### Scenario 4: [`TaskItem.tsx`](/5-Fuller/task-manager-app/src/components/TaskItem.tsx)

1. Line 25: Add an `enum taskPriority` 

   NES should suggest updates to the priority comparison logic to use the enum (i.e. `TaskPriority.HIGH` instead of `high`). 
   
   It should also suggest to create an enum for `taskStatus` and then use it in the status comparison logic.

2. Switch statement starting line 39: Modify the task status rendering to use emojis and friendlier language.

   Change from:
   ```typescript
   return 'status-completed';
   ```

   to:
   ```typescript
   return 'Task completed! ✅';
   ```

   NES should suggest similar updates throughout the rest of the switch statement.

## 🎮 Usage Guide

### Creating Tasks
1. Click "Add New Task" or press `Ctrl+N`
2. Fill in task details (title is required)
3. Add tags by typing and clicking "Add"
4. Set priority and due date as needed
5. Click "Create Task"

### Managing Tasks
- **Change Status**: Use the dropdown in each task card
- **View Details**: Click the arrow button to expand task details
- **Edit**: Click the pencil icon (feature in development)
- **Delete**: Click the trash icon

### Filtering & Searching
- **Search**: Type in the search box or press `Ctrl+K`
- **Filter by Status**: Use the status dropdown
- **Filter by Priority**: Use the priority dropdown
- **Sort**: Click sort buttons for Due Date, Priority, or Title

### Keyboard Shortcuts
- `Ctrl+N`: Add new task
- `Ctrl+K`: Focus search field

## 🔧 Development Notes

This application demonstrates several advanced React patterns:

- **Context API**: Global state management without Redux
- **Custom Hooks**: Reusable logic extraction
- **TypeScript**: Full type safety with interfaces and unions
- **Local Storage**: Data persistence without a backend
- **Responsive Design**: Mobile-first CSS approach
- **Component Composition**: Modular, reusable components

The code includes extensive comments explaining NES scenarios and is designed to be an excellent learning resource for React development with Copilot assistance.

## 📈 Future Enhancements

Potential improvements that could be made:
- Drag & drop task reordering
- Task categories/projects
- Team collaboration features
- Due date notifications
- Export/import functionality
- Dark mode toggle
- Calendar view
- Task templates