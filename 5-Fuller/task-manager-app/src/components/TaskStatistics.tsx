import React from 'react';
import { useTaskContext } from '../context/TaskContext';

const TaskStatistics: React.FC = () => {
  const { tasks } = useTaskContext();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;

  const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;
  const mediumPriorityTasks = tasks.filter(task => task.priority === 'medium').length;
  const lowPriorityTasks = tasks.filter(task => task.priority === 'low').length;

  // Calculate overdue tasks
  const now = new Date();
  const overdueTasks = tasks.filter(task => 
    task.dueDate && 
    task.dueDate < now && 
    task.status !== 'completed'
  ).length;

  // Calculate completion percentage
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Get most common tags
  const tagCounts = tasks.reduce((acc, task) => {
    task.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const topTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="task-statistics">
      <h2>Task Statistics</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{totalTasks}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{completedTasks}</div>
          <div className="stat-label">Completed</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{inProgressTasks}</div>
          <div className="stat-label">In Progress</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{todoTasks}</div>
          <div className="stat-label">To Do</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{overdueTasks}</div>
          <div className="stat-label">Overdue</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{completionPercentage}%</div>
          <div className="stat-label">Completion Rate</div>
        </div>
      </div>

      <div className="priority-breakdown">
        <h3>Priority Breakdown</h3>
        <div className="priority-bars">
          <div className="priority-bar">
            <span className="priority-label">High Priority:</span>
            <div className="priority-bar-container">
              <div 
                className="priority-bar-fill high" 
                style={{ width: totalTasks > 0 ? `${(highPriorityTasks / totalTasks) * 100}%` : '0%' }}
              ></div>
            </div>
            <span className="priority-count">{highPriorityTasks}</span>
          </div>
          
          <div className="priority-bar">
            <span className="priority-label">Medium Priority:</span>
            <div className="priority-bar-container">
              <div 
                className="priority-bar-fill medium" 
                style={{ width: totalTasks > 0 ? `${(mediumPriorityTasks / totalTasks) * 100}%` : '0%' }}
              ></div>
            </div>
            <span className="priority-count">{mediumPriorityTasks}</span>
          </div>
          
          <div className="priority-bar">
            <span className="priority-label">Low Priority:</span>
            <div className="priority-bar-container">
              <div 
                className="priority-bar-fill low" 
                style={{ width: totalTasks > 0 ? `${(lowPriorityTasks / totalTasks) * 100}%` : '0%' }}
              ></div>
            </div>
            <span className="priority-count">{lowPriorityTasks}</span>
          </div>
        </div>
      </div>

      {topTags.length > 0 && (
        <div className="top-tags">
          <h3>Most Used Tags</h3>
          <div className="tags-list">
            {topTags.map(([tag, count]) => (
              <div key={tag} className="tag-stat">
                <span className="tag">{tag}</span>
                <span className="tag-count">({count})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskStatistics;