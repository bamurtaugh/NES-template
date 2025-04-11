import React, { useState, useMemo } from 'react';
import { Task } from '../types/task';
import TaskItem from './TaskItem';
import { useTaskContext } from '../context/TaskContext';

const TaskList: React.FC = () => {
  const { tasks } = useTaskContext();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<Task['status'] | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<Task['priority'] | 'all'>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'title'>('dueDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Demo 1: Uncomment these pagination variables to see NES suggest pagination UI and logic
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 5;
  
  // Demo 2: Uncomment to see NES suggest batch selection UI and operations
  // const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  
  // Demo 3: Uncomment to see NES suggest grouping implementation
  // const [groupByField, setGroupByField] = useState<'status' | 'priority' | null>(null);

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    // First, apply filters
    let result = [...tasks];
    
    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter(task => task.status === filterStatus);
    }
    
    // Filter by priority
    if (filterPriority !== 'all') {
      result = result.filter(task => task.priority === filterPriority);
    }
    
    // Apply search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(term) || 
        task.description.toLowerCase().includes(term) ||
        task.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Then, apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'dueDate':
          // Handle null due dates
          if (!a.dueDate && !b.dueDate) {
            comparison = 0;
          } else if (!a.dueDate) {
            comparison = 1; // a is "larger" (null dates at the end)
          } else if (!b.dueDate) {
            comparison = -1; // b is "larger" (null dates at the end)
          } else {
            comparison = a.dueDate.getTime() - b.dueDate.getTime();
          }
          break;
          
        case 'priority':
          // Convert priority to numeric value for comparison
          const priorityValues = { high: 3, medium: 2, low: 1 };
          comparison = priorityValues[a.priority] - priorityValues[b.priority];
          break;
          
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
          
        default:
          comparison = 0;
      }
      
      // Apply sort direction
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    return result;
  }, [tasks, filterStatus, filterPriority, searchTerm, sortBy, sortDirection]);

  // Toggle sort direction when clicking on the same sort field
  const handleSortChange = (newSortBy: 'dueDate' | 'priority' | 'title') => {
    if (sortBy === newSortBy) {
      // Toggle direction if clicking the same sort field
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort field and reset to ascending
      setSortBy(newSortBy);
      setSortDirection('asc');
    }
  };

  // Handler for editing task
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    // In a real app, you'd open a modal or navigate to edit page
    console.log('Edit task:', task);
  };

  return (
    <div className="task-list-container">
      <div className="task-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="status-filter">Status:</label>
            <select
              id="status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as Task['status'] | 'all')}
            >
              <option value="all">All</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="priority-filter">Priority:</label>
            <select
              id="priority-filter"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as Task['priority'] | 'all')}
            >
              <option value="all">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        
        <div className="sort-controls">
          <span>Sort by: </span>
          <button 
            onClick={() => handleSortChange('dueDate')}
            className={`sort-btn ${sortBy === 'dueDate' ? 'active' : ''}`}
          >
            Due Date {sortBy === 'dueDate' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
          <button 
            onClick={() => handleSortChange('priority')}
            className={`sort-btn ${sortBy === 'priority' ? 'active' : ''}`}
          >
            Priority {sortBy === 'priority' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
          <button 
            onClick={() => handleSortChange('title')}
            className={`sort-btn ${sortBy === 'title' ? 'active' : ''}`}
          >
            Title {sortBy === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      <div className="task-count">
        <span>{filteredAndSortedTasks.length} tasks</span>
      </div>

      {filteredAndSortedTasks.length > 0 ? (
        <div className="tasks-grid">
          {filteredAndSortedTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onEdit={handleEditTask}
            />
          ))}
        </div>
      ) : (
        <div className="no-tasks-message">
          <p>No tasks found matching your filters</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
