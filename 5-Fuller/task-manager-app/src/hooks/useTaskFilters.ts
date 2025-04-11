import { useState, useMemo } from 'react';
import { Task } from '../types/task';

export interface TaskFilters {
  status: Task['status'] | 'all';
  priority: Task['priority'] | 'all';
  showOverdueOnly?: boolean;
  searchTerm: string;
  tag?: string;
  dueDateStart?: Date | null;
  dueDateEnd?: Date | null;
}

export interface SortOptions {
  sortBy: 'dueDate' | 'priority' | 'title' | 'createdAt' | 'updatedAt';
  sortDirection: 'asc' | 'desc';
}

export interface UseTaskFiltersResult {
  filters: TaskFilters;
  sortOptions: SortOptions;
  filteredAndSortedTasks: Task[];
  setStatusFilter: (status: TaskFilters['status']) => void;
  setPriorityFilter: (priority: TaskFilters['priority']) => void;
  setSearchTerm: (term: string) => void;
  setTagFilter: (tag: string | undefined) => void;
  setDueDateRange: (start: Date | null, end: Date | null) => void;
  setSortBy: (sortBy: SortOptions['sortBy']) => void;
  toggleSortDirection: () => void;
  resetFilters: () => void;
}

const useTaskFilters = (tasks: Task[]): UseTaskFiltersResult => {
  // Filter state
  const [filters, setFilters] = useState<TaskFilters>({
    status: 'all',
    priority: 'all',
    searchTerm: '',
  });
  
  // Sort state
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    sortBy: 'dueDate',
    sortDirection: 'asc',
  });

  // Filter setters
  const setStatusFilter = (status: TaskFilters['status']) => {
    setFilters(prev => ({ ...prev, status }));
  };

  const setPriorityFilter = (priority: TaskFilters['priority']) => {
    setFilters(prev => ({ ...prev, priority }));
  };

  const setSearchTerm = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  const setTagFilter = (tag: string | undefined) => {
    setFilters(prev => ({ ...prev, tag }));
  };

  const setDueDateRange = (dueDateStart: Date | null, dueDateEnd: Date | null) => {
    setFilters(prev => ({ ...prev, dueDateStart, dueDateEnd }));
  };

  // Sort setters
  const setSortBy = (sortBy: SortOptions['sortBy']) => {
    setSortOptions(prev => ({
      sortBy,
      // Reset to ascending when changing sort field
      sortDirection: prev.sortBy === sortBy ? prev.sortDirection : 'asc'
    }));
  };

  const toggleSortDirection = () => {
    setSortOptions(prev => ({
      ...prev,
      sortDirection: prev.sortDirection === 'asc' ? 'desc' : 'asc' 
    }));
  };

  const resetFilters = () => {
    setFilters({
      status: 'all',
      priority: 'all',
      searchTerm: '',
      tag: undefined,
      dueDateStart: null,
      dueDateEnd: null,
    });
    
    setSortOptions({
      sortBy: 'dueDate',
      sortDirection: 'asc',
    });
  };

  // Apply filters and sorting
  const filteredAndSortedTasks = useMemo(() => {
    const { status, priority, searchTerm, tag, dueDateStart, dueDateEnd } = filters;
    const { sortBy, sortDirection } = sortOptions;
    
    // First, apply filters
    let result = [...tasks];
    
    // Filter by status
    if (status !== 'all') {
      result = result.filter(task => task.status === status);
    }
    
    // Filter by priority
    if (priority !== 'all') {
      result = result.filter(task => task.priority === priority);
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(term) || 
        task.description.toLowerCase().includes(term) ||
        task.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Filter by tag
    if (tag) {
      result = result.filter(task => task.tags.includes(tag));
    }

    // Filter by due date range
    if (dueDateStart && dueDateEnd) {
      result = result.filter(task => 
        task.dueDate && 
        task.dueDate >= dueDateStart && 
        task.dueDate <= dueDateEnd
      );
    } else if (dueDateStart) {
      result = result.filter(task => 
        task.dueDate && task.dueDate >= dueDateStart
      );
    } else if (dueDateEnd) {
      result = result.filter(task => 
        task.dueDate && task.dueDate <= dueDateEnd
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
          
        case 'createdAt':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
          
        case 'updatedAt':
          comparison = a.updatedAt.getTime() - b.updatedAt.getTime();
          break;
          
        default:
          comparison = 0;
      }
      
      // Apply sort direction
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    return result;
  }, [tasks, filters, sortOptions]);

  return {
    filters,
    sortOptions,
    filteredAndSortedTasks,
    setStatusFilter,
    setPriorityFilter,
    setSearchTerm,
    setTagFilter,
    setDueDateRange,
    setSortBy,
    toggleSortDirection,
    resetFilters,
  };
};

export default useTaskFilters;
