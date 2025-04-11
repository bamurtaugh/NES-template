import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskFormData } from '../types/task';

interface TaskContextType {
  tasks: Task[];
  addTask: (taskData: TaskFormData) => Task;
  updateTask: (id: string, taskData: Partial<Task>) => Task | null;
  deleteTask: (id: string) => boolean;
  getTaskById: (id: string) => Task | undefined;
  getTasksByStatus: (status: Task['status']) => Task[];
  getTasksByPriority: (priority: Task['priority']) => Task[];
  getTasksByTag: (tag: string) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Demo for NES: This context provider shows how NES can help with:
// 1. Adding new methods to the context (e.g., adding bulk operations)
// 2. Enhancing existing methods with new functionality (e.g., adding validation)
// 3. Implementing persistence logic (e.g., saving to localStorage)

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        // Convert ISO date strings back to Date objects
        const formattedTasks = parsedTasks.map((task: any) => ({
          ...task,
          dueDate: task.dueDate ? new Date(task.dueDate) : null,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt)
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error('Error parsing stored tasks:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: TaskFormData): Task => {
    const now = new Date();
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    return newTask;
  };

  const updateTask = (id: string, taskData: Partial<Task>): Task | null => {
    let updatedTask: Task | null = null;
    
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === id) {
          updatedTask = {
            ...task,
            ...taskData,
            updatedAt: new Date()
          };
          return updatedTask;
        }
        return task;
      })
    );
    
    return updatedTask;
  };

  const deleteTask = (id: string): boolean => {
    let deleted = false;
    
    setTasks(prevTasks => {
      const filtered = prevTasks.filter(task => task.id !== id);
      deleted = filtered.length < prevTasks.length;
      return filtered;
    });
    
    return deleted;
  };

  const getTaskById = (id: string): Task | undefined => {
    return tasks.find(task => task.id === id);
  };

  const getTasksByStatus = (status: Task['status']): Task[] => {
    return tasks.filter(task => task.status === status);
  };

  const getTasksByPriority = (priority: Task['priority']): Task[] => {
    return tasks.filter(task => task.priority === priority);
  };

  const getTasksByTag = (tag: string): Task[] => {
    return tasks.filter(task => task.tags.includes(tag));
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
    getTasksByStatus,
    getTasksByPriority,
    getTasksByTag
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
