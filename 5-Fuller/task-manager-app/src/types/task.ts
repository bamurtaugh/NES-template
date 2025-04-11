// NES Demo: Try edits from README Scenario 2 to see Next Edit Suggestions in action

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

export type TaskFormData = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'showOverdueOnly'>;

export type TaskStatus = 'todo' | 'in-progress' | 'completed';