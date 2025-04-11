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
  // Demo scenario 1: Uncomment this line to see NES suggest updates in:
  // - TaskFilters interface
  // - Filter setter function
  // - Filter logic in useMemo
  // - resetFilters function
  // assignedTo?: string;
  
  // Demo scenario 2: Change priority to: 'low' | 'medium' | 'high' | 'critical'
  // See NES suggest updates to the priority sorting logic in useTaskFilters.ts
}

export type TaskFormData = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

// Demo scenario 3: Start typing "export type TaskSummary" below
// and see NES suggest the complete definition based on Task

// Demo scenario 4: Add a function parameter with completedAt field
// e.g., function markTaskComplete(task: Task): Task & { completedAt: Date } {
//       See NES suggest the function implementation and related changes
