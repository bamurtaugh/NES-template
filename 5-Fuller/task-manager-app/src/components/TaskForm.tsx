import React, { useState, useEffect } from 'react';
import { Task, TaskFormData } from '../types/task';
import { useTaskContext } from '../context/TaskContext';
import { format } from 'date-fns';

interface TaskFormProps {
  task?: Task;
  onSubmit?: (task: Task) => void;
  onCancel?: () => void;
}

// NES Demo: Try these edits to see Next Edit Suggestions in action:
//
// 1. Change the validateForm method to check for minimum description length:
//    if (formData.description.trim().length < 10) {
//      newErrors.description = 'Description must be at least 10 characters';
//    }
//    NES should identify that the existing condition also checks description and suggest 
//    combining the two conditions into a more elegant solution
//
// 2. Add a new showConfirmation parameter to the handleRemoveTag function:
//    const handleRemoveTag = (tagToRemove: string, showConfirmation: boolean = false) => {
//    NES should suggest updating the onClick handler in the JSX and adding confirmation logic
//
// 3. Change the form submission button's conditional text from:
//    {task ? 'Update Task' : 'Create Task'} to something with more conditions like:
//    {task ? 'Update' : formData.priority === 'high' ? 'Create Urgent Task' : 'Create Task'}
//    NES should suggest similar conditional logic in other parts of the component

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
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Task Title*</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <p className="error-message">{errors.title}</p>}
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
        />
        {errors.description && <p className="error-message">{errors.description}</p>}
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
          >
            Add
          </button>
        </div>
        <div className="tags-container">
          {formData.tags.map(tag => (
            <span key={tag} className="tag">
              {tag}
              <button 
                type="button" 
                onClick={() => handleRemoveTag(tag)}
                className="tag-remove-btn"
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
