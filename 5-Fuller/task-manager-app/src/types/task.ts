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

// NES Demo: Try these edits in this file to see Next Edit Suggestions in action:
//
// 1. Add a new field in the Task interface like 'isArchived: boolean;'
//    NES should suggest adding it to the TaskFormData type as well
//
//      VERIFIED
//
// 2. Create a TaskStatus type alias for the status field values:
//    type TaskStatus = 'todo' | 'in-progress' | 'completed';
//    NES should suggest updating the status field in Task to use this type
//
//      VERIFIED
//
// 3. Add a TaskPriority enum above the Task interface:
//    enum TaskPriority { Low = 'low', Medium = 'medium', High = 'high' }
//    NES should suggest updating the priority field to use this enum
//
//      VERIFIED