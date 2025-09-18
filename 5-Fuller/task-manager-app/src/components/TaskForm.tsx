import React, { useState, useEffect } from 'react';
import { Task, TaskFormData } from '../types/task';
import { useTaskContext } from '../context/TaskContext';
import { format } from 'date-fns';

interface TaskFormProps {
  task?: Task;
  onSubmit?: (task: Task) => void;
  onCancel?: () => void;
}

// NES Demo: Try edits from README Scenario 1 to see Next Edit Suggestions in action

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const { addTask, updateTask } = useTaskContext();
  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});
  
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    dueDate: null,
    tags: []
  });

  const [tagInput, setTagInput] = useState('');

  // Initialize form with task data if provided
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate,
        tags: [...task.tags]
      });
    }
  }, [task]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TaskFormData, string>> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (formData.description.trim().length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      dueDate: value ? new Date(value) : null
    }));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    let result: Task;
    
    if (task) {
      // Update existing task
      const updated = updateTask(task.id, formData);
      if (!updated) return;
      result = updated;
    } else {
      // Create new task
      result = addTask(formData);
    }
    
    if (onSubmit) {
      onSubmit(result);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form" role="form" aria-labelledby="task-form-heading">
      <div className="form-group">
        <label htmlFor="title">Task Title*</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
          aria-required="true"
          aria-invalid={errors.title ? 'true' : 'false'}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && <p id="title-error" className="error-message" role="alert">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={errors.description ? 'error' : ''}
          rows={4}
          aria-invalid={errors.description ? 'true' : 'false'}
          aria-describedby={errors.description ? 'description-error description-help' : 'description-help'}
        />
        <div id="description-help" className="form-help">
          Maximum 500 characters
        </div>
        {errors.description && <p id="description-error" className="error-message" role="alert">{errors.description}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate ? format(formData.dueDate, 'yyyy-MM-dd') : ''}
          onChange={handleDateChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tagInput">Tags</label>
        <div className="tag-input-container">
          <input
            type="text"
            id="tagInput"
            value={tagInput}
            onChange={handleTagInputChange}
            placeholder="Add tag and press Enter"
          />
          <button 
            type="button" 
            onClick={handleAddTag}
            className="tag-add-btn"
            aria-label="Add tag to task"
          >
            Add
          </button>
        </div>
        <div className="tags-container" role="list" aria-label="Current tags">
          {formData.tags.map(tag => (
            <span key={tag} className="tag" role="listitem">
              {tag}
              <button 
                type="button" 
                onClick={() => handleRemoveTag(tag)}
                className="tag-remove-btn"
                aria-label={`Remove tag ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {task ? 'Update Task' : 'Create Task'}
        </button>
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
