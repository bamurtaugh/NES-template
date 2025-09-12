import React, { useState } from 'react';
import { TaskProvider, useTaskContext } from '../context/TaskContext';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskStatistics from '../components/TaskStatistics';
import { Task } from '../types/task';

const AppContent: React.FC = () => {
  const { tasks, loadSampleData, clearAllTasks } = useTaskContext();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddClick = () => {
    setIsAddingTask(true);
    setEditingTask(null);
  };

  const handleTaskFormSubmit = () => {
    setIsAddingTask(false);
    setEditingTask(null);
  };

  const handleTaskFormCancel = () => {
    setIsAddingTask(false);
    setEditingTask(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p className="app-description">
          An advanced example showing how Copilot Next Edit Suggestions can help
        </p>
      </header>

      <main className="app-main">
        <TaskStatistics />
        
        <div className="app-controls">
          {tasks.length === 0 && (
            <button 
              className="btn-secondary"
              onClick={loadSampleData}
              style={{ marginRight: '10px' }}
            >
              Load Sample Data
            </button>
          )}
          {tasks.length > 0 && (
            <button 
              className="btn-secondary"
              onClick={clearAllTasks}
              style={{ marginRight: '10px' }}
            >
              Clear All Tasks
            </button>
          )}
          <button 
            className="btn-primary add-task-btn"
            onClick={handleAddClick}
          >
            Add New Task
          </button>
        </div>

        {(isAddingTask || editingTask) && (
          <div className="task-form-container">
            <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
            <TaskForm 
              task={editingTask || undefined}
              onSubmit={handleTaskFormSubmit}
              onCancel={handleTaskFormCancel}
            />
          </div>
        )}

        <TaskList />
      </main>

      <footer className="app-footer">
        <p>
          This is an example application to demonstrate Copilot Next Edit Suggestions.
        </p>
        <p>
          The application includes comments explaining how NES can help in various
          scenarios across multiple files.
        </p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
};

export default App;
