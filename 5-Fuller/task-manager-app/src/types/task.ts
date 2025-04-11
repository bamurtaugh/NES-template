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

// NES Demo: Try these edits in this file to see Next Edit Suggestions in action:
//
// 1. Change the 'status' type from 'todo' | 'in-progress' | 'completed' 
//    to 'todo' | 'in-progress' | 'blocked' | 'completed'
//    NES should suggest updating related code in this file
//
// 2. Rename the 'priority' field to 'priorityLevel' 
//    NES should identify all usages that need to be updated
//
// 3. Add a completedAt field to the Task interface:
//    completedAt: Date | null;
//    NES should suggest adding it to TaskFormData and other related spots
