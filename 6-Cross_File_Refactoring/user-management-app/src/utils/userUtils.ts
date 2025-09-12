// Utility functions for user management
// NES Demo: Shows how utility function renaming propagates through the app

import { User, UserRole } from '../types/user';

// Format user display name
export function formatUserName(user: User): string {
  return `${user.name} (${user.email})`;
}

// Get user role display text
export function getUserRoleDisplay(role: UserRole): string {
  switch (role) {
    case 'admin':
      return 'Administrator';
    case 'manager':
      return 'Manager';
    case 'user':
      return 'Standard User';
    default:
      return 'Unknown';
  }
}

// Check if user has admin privileges
export function isUserAdmin(user: User): boolean {
  return user.role === 'admin';
}

// Check if user can manage other users
export function canUserManageUsers(user: User): boolean {
  return user.role === 'admin' || user.role === 'manager';
}

// Get user status display
export function getUserStatusText(user: User): string {
  return user.isActive ? 'Active' : 'Inactive';
}

// Calculate days since user creation
export function getUserAccountAge(user: User): number {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - user.createdAt.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Format last login display
export function formatUserLastLogin(user: User): string {
  if (!user.lastLoginAt) {
    return 'Never';
  }
  
  const now = new Date();
  const diffTime = now.getTime() - user.lastLoginAt.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else {
    return `${diffDays} days ago`;
  }
}

// Validate user data
export function validateUserEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateUserName(name: string): boolean {
  return name.trim().length >= 2;
}