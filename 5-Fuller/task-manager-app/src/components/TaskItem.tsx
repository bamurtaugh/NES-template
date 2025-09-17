// NES Demo: Try edits from README Scenario 4 to see Next Edit Suggestions in action

import React, { useState } from 'react';
import { Task } from '../types/task';
import { format } from 'date-fns';
import { useTaskContext } from '../context/TaskContext';

interface TaskItemProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

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
    <article className={`task-item ${getStatusClass()}`} role="listitem">
      <header className="task-header">
        <div className="task-title-container">
          <span className={`priority-indicator ${getPriorityClass()}`} aria-label={`Priority: ${task.priority}`}></span>
          <h3 className="task-title">{task.title}</h3>
        </div>
        <div className="task-actions" role="group" aria-label="Task actions">
          <button 
            className="btn-icon"
            onClick={() => setShowDetails(!showDetails)}
            aria-label={showDetails ? "Hide task details" : "Show task details"}
            aria-expanded={showDetails}
            aria-controls={`task-details-${task.id}`}
          >
            {showDetails ? '▼' : '►'}
          </button>
          {onEdit && (
            <button 
              className="btn-icon"
              onClick={() => onEdit(task)}
              aria-label={`Edit task: ${task.title}`}
            >
              ✏️
            </button>
          )}
          <button 
            className="btn-icon delete"
            onClick={handleDelete}
            aria-label={`Delete task: ${task.title}`}
          >
            🗑️
          </button>
        </div>
      </header>

      <div className="task-brief">
        <div className="task-status">
          <label htmlFor={`status-${task.id}`}>Status: </label>
          <select
            id={`status-${task.id}`}
            value={task.status}
            onChange={(e) => handleStatusUpdate(e.target.value as Task['status'])}
            className={getStatusClass()}
            aria-label={`Change status for task: ${task.title}`}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="task-due-date">
          <span aria-label="Due date">Due: {formatDate(task.dueDate)}</span>
        </div>
      </div>

      {showDetails && (
        <div 
          id={`task-details-${task.id}`} 
          className="task-details"
          aria-labelledby={`task-title-${task.id}`}
        >
          <div className="task-description">
            <h4>Description:</h4>
            <p>{task.description || 'No description provided'}</p>
          </div>
          
          <div className="task-metadata">
            <div className="task-tags">
              <h4>Tags:</h4>
              {task.tags.length > 0 ? (
                <div className="tags-container" role="list" aria-label="Task tags">
                  {task.tags.map(tag => (
                    <span key={tag} className="tag" role="listitem">{tag}</span>
                  ))}
                </div>
              ) : (
                <p>No tags</p>
              )}
            </div>
            
            <div className="task-dates">
              <p><strong>Created:</strong> <time dateTime={task.createdAt.toISOString()}>{format(task.createdAt, 'MMM d, yyyy')}</time></p>
              <p><strong>Last Updated:</strong> <time dateTime={task.updatedAt.toISOString()}>{format(task.updatedAt, 'MMM d, yyyy')}</time></p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default TaskItem;
