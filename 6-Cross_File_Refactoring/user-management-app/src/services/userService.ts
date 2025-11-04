// User service for API interactions
// NES Demo: This service shows how function and variable renaming affects multiple files

import { User, UserFormData, UserListFilter } from '../types/user';

// Mock data store
let users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    isActive: true,
    createdAt: new Date('2023-01-01'),
    lastLoginAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'manager',
    isActive: true,
    createdAt: new Date('2023-02-15'),
    lastLoginAt: new Date('2024-01-14')
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'user',
    isActive: false,
    createdAt: new Date('2023-03-20')
  }
];

export class UserService {
  // Get all users with optional filtering
  static async getAllUsers(filter?: UserListFilter): Promise<User[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    let filteredUsers = [...users];
    
    if (filter) {
      if (filter.role) {
        filteredUsers = filteredUsers.filter(user => user.role === filter.role);
      }
      
      if (filter.isActive !== undefined) {
        filteredUsers = filteredUsers.filter(user => user.isActive === filter.isActive);
      }
      
      if (filter.searchTerm) {
        const term = filter.searchTerm.toLowerCase();
        filteredUsers = filteredUsers.filter(user =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
        );
      }
    }
    
    return filteredUsers;
  }

  // Get user by ID
  static async getUserById(id: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return users.find(user => user.id === id) || null;
  }

  // Create new user
  static async createUser(userData: UserFormData): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    users.push(newUser);
    return newUser;
  }

  // Update existing user
  static async updateUser(id: string, userData: Partial<UserFormData>): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return null;
    }
    
    users[userIndex] = {
      ...users[userIndex],
      ...userData
    };
    
    return users[userIndex];
  }

  // Delete user
  static async deleteUser(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return false;
    }
    
    users.splice(userIndex, 1);
    return true;
  }

  // Get users by role - another method that references User types
  static async getUsersByRole(role: User['role']): Promise<User[]> {
    const allUsers = await this.getAllUsers();
    return allUsers.filter(user => user.role === role);
  }

  // Activate/deactivate user
  static async toggleUserStatus(id: string): Promise<User | null> {
    const user = await this.getUserById(id);
    if (!user) {
      return null;
    }
    
    return this.updateUser(id, { isActive: !user.isActive });
  }
}