// Main application component
// NES Demo: This component imports and uses user-related functionality from multiple files

import React, { useState, useEffect } from 'react';
import { User, UserListFilter } from '../types/user';
import { UserService } from '../services/userService';
import UserList from './UserList';
import UserForm from './UserForm';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filter, setFilter] = useState<UserListFilter>({});
  const [loading, setLoading] = useState(true);

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, [filter]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const userData = await UserService.getAllUsers(filter);
      setUsers(userData);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsFormVisible(true);
  };

  const handleUserCreate = () => {
    setSelectedUser(null);
    setIsFormVisible(true);
  };

  const handleUserSave = async (userData: any) => {
    try {
      if (selectedUser) {
        await UserService.updateUser(selectedUser.id, userData);
      } else {
        await UserService.createUser(userData);
      }
      
      setIsFormVisible(false);
      setSelectedUser(null);
      await loadUsers();
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  const handleUserDelete = async (user: User) => {
    try {
      await UserService.deleteUser(user.id);
      await loadUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleFormCancel = () => {
    setIsFormVisible(false);
    setSelectedUser(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>User Management System</h1>
        <p>Demonstrating Cross-File Refactoring with VS Code NES</p>
      </header>

      <main className="app-main">
        <div className="app-toolbar">
          <button onClick={handleUserCreate} className="btn-primary">
            Add New User
          </button>
        </div>

        {isFormVisible && (
          <div className="form-container">
            <h2>{selectedUser ? 'Edit User' : 'Create User'}</h2>
            <UserForm
              user={selectedUser}
              onSave={handleUserSave}
              onCancel={handleFormCancel}
            />
          </div>
        )}

        <UserList
          users={users}
          loading={loading}
          filter={filter}
          onFilterChange={setFilter}
          onUserSelect={handleUserSelect}
          onUserDelete={handleUserDelete}
        />
      </main>
    </div>
  );
};

export default App;