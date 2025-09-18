import React, { useState } from 'react';
import { TaskProvider } from '../context/TaskContext';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { Task } from '../types/task';

const App: React.FC = () => {
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
    <TaskProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>Task Manager</h1>
          <p className="app-description">
            An advanced example showing how Copilot Next Edit Suggestions can help
          </p>
        </header>

        <main className="app-main" role="main">
          <div className="app-controls">
            <button 
              className="btn-primary add-task-btn"
              onClick={handleAddClick}
              aria-expanded={isAddingTask}
              aria-controls={isAddingTask ? 'task-form-container' : undefined}
            >
              Add New Task
            </button>
          </div>

          {(isAddingTask || editingTask) && (
            <section 
              id="task-form-container" 
              className="task-form-container"
              aria-labelledby="task-form-heading"
            >
              <h2 id="task-form-heading">{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
              <TaskForm 
                task={editingTask || undefined}
                onSubmit={handleTaskFormSubmit}
                onCancel={handleTaskFormCancel}
              />
            </section>
          )}

          <section aria-labelledby="task-list-heading">
            <TaskList />
          </section>
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
    </TaskProvider>
  );
};

export default App;
