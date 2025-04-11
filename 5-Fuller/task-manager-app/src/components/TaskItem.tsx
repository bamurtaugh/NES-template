import React, { useState } from 'react';
import { Task } from '../types/task';
import { format } from 'date-fns';
import { useTaskContext } from '../context/TaskContext';

interface TaskItemProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

// This component demonstrates how NES can help with:
// 1. Adding new features to components (e.g., expand/collapse details)
// 2. Implementing different display modes (e.g., compact view, grid view)
// 3. Adding conditional rendering based on task properties
// 4. Implementing animations or transitions
// 5. Adding accessibility improvements

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  const { deleteTask, updateTask } = useTaskContext();
  const [showDetails, setShowDetails] = useState(false);

  const handleDelete = () => {
    // In a real app, you'd add confirmation dialog
    deleteTask(task.id);
  };

  const handleStatusUpdate = (newStatus: Task['status']) => {
    updateTask(task.id, { status: newStatus });
  };

  const getPriorityClass = () => {
    switch (task.priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };

  const getStatusClass = () => {
    switch (task.status) {
      case 'completed':
        return 'status-completed';
      case 'in-progress':
        return 'status-in-progress';
      case 'todo':
        return 'status-todo';
      default:
        return '';
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'No due date';
    return format(date, 'MMM d, yyyy');
  };

  return (
    <div className={`task-item ${getStatusClass()}`}>
      <div className="task-header">
        <div className="task-title-container">
          <span className={`priority-indicator ${getPriorityClass()}`}></span>
          <h3 className="task-title">{task.title}</h3>
        </div>
        <div className="task-actions">
          <button 
            className="btn-icon"
            onClick={() => setShowDetails(!showDetails)}
            aria-label={showDetails ? "Hide details" : "Show details"}
          >
            {showDetails ? '▼' : '►'}
          </button>
          {onEdit && (
            <button 
              className="btn-icon"
              onClick={() => onEdit(task)}
              aria-label="Edit task"
            >
              ✏️
            </button>
          )}
          <button 
            className="btn-icon delete"
            onClick={handleDelete}
            aria-label="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="task-brief">
        <div className="task-status">
          <span>Status: </span>
          <select
            value={task.status}
            onChange={(e) => handleStatusUpdate(e.target.value as Task['status'])}
            className={getStatusClass()}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="task-due-date">
          Due: {formatDate(task.dueDate)}
        </div>
      </div>

      {showDetails && (
        <div className="task-details">
          <div className="task-description">
            <h4>Description:</h4>
            <p>{task.description || 'No description provided'}</p>
          </div>
          
          <div className="task-metadata">
            <div className="task-tags">
              <h4>Tags:</h4>
              {task.tags.length > 0 ? (
                <div className="tags-container">
                  {task.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              ) : (
                <p>No tags</p>
              )}
            </div>
            
            <div className="task-dates">
              <p><strong>Created:</strong> {format(task.createdAt, 'MMM d, yyyy')}</p>
              <p><strong>Last Updated:</strong> {format(task.updatedAt, 'MMM d, yyyy')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
