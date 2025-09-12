// User list component with filtering
// NES Demo: Component that uses user utilities and demonstrates import updates

import React from 'react';
import { User, UserListFilter, UserRole } from '../types/user';
import { 
  formatUserName, 
  getUserRoleDisplay, 
  getUserStatusText, 
  formatUserLastLogin,
  isUserAdmin
} from '../utils/userUtils';

interface UserListProps {
  users: User[];
  loading: boolean;
  filter: UserListFilter;
  onFilterChange: (filter: UserListFilter) => void;
  onUserSelect: (user: User) => void;
  onUserDelete: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  loading,
  filter,
  onFilterChange,
  onUserSelect,
  onUserDelete
}) => {
  const handleRoleFilterChange = (role: UserRole | '') => {
    onFilterChange({
      ...filter,
      role: role || undefined
    });
  };

  const handleStatusFilterChange = (status: string) => {
    onFilterChange({
      ...filter,
      isActive: status === 'all' ? undefined : status === 'active'
    });
  };

  const handleSearchChange = (searchTerm: string) => {
    onFilterChange({
      ...filter,
      searchTerm: searchTerm || undefined
    });
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="user-list-container">
      <div className="user-filters">
        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={filter.searchTerm || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Role:</label>
          <select
            value={filter.role || ''}
            onChange={(e) => handleRoleFilterChange(e.target.value as UserRole)}
          >
            <option value="">All Roles</option>
            <option value="admin">Administrator</option>
            <option value="manager">Manager</option>
            <option value="user">Standard User</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select
            value={filter.isActive === undefined ? 'all' : (filter.isActive ? 'active' : 'inactive')}
            onChange={(e) => handleStatusFilterChange(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="user-table">
        {users.length === 0 ? (
          <div className="no-users">No users found matching the current filters.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name & Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className={`user-row ${!user.isActive ? 'inactive' : ''}`}>
                  <td>
                    <div className="user-info">
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                      {isUserAdmin(user) && <span className="admin-badge">ADMIN</span>}
                    </div>
                  </td>
                  <td>{getUserRoleDisplay(user.role)}</td>
                  <td>
                    <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                      {getUserStatusText(user)}
                    </span>
                  </td>
                  <td>{formatUserLastLogin(user)}</td>
                  <td>
                    <div className="user-actions">
                      <button 
                        onClick={() => onUserSelect(user)}
                        className="btn-secondary"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => onUserDelete(user)}
                        className="btn-danger"
                        disabled={isUserAdmin(user)}
                        title={isUserAdmin(user) ? "Cannot delete admin users" : "Delete user"}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="user-count">
        Showing {users.length} user{users.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default UserList;