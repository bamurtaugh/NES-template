export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  dueDate: Date | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type TaskFormData = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

// This file demonstrates how Copilot Next Edit Suggestions can help:
// 1. When you're adding new fields (e.g., adding 'assignedTo' field)
// 2. When you're modifying existing types (e.g., changing priority options)
// 3. When you need to derive additional types (e.g., creating TaskSummary type)
