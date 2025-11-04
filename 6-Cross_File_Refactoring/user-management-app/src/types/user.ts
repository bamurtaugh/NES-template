// Types for user management system
// NES Demo: This file demonstrates cross-file type refactoring scenarios

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
}

export type UserRole = 'admin' | 'manager' | 'user';

export interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface UserListFilter {
  role?: UserRole;
  isActive?: boolean;
  searchTerm?: string;
}

// Additional types that reference User
export interface UserActivity {
  userId: string;
  user: User;
  action: string;
  timestamp: Date;
}

export interface UserPermission {
  userId: string;
  resourceId: string;
  permission: 'read' | 'write' | 'admin';
}