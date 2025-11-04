// User form component for creating and editing users
// NES Demo: Form component that uses user types and validation utilities

import React, { useState, useEffect } from 'react';
import { User, UserFormData, UserRole } from '../types/user';
import { validateUserEmail, validateUserName, getUserRoleDisplay } from '../utils/userUtils';

interface UserFormProps {
  user?: User | null;
  onSave: (userData: UserFormData) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'user',
    isActive: true
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});

  // Initialize form data when user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      });
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'user',
        isActive: true
      });
    }
    setErrors({});
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};

    if (!validateUserName(formData.name)) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!validateUserEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleInputChange = (field: keyof UserFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const userRoles: UserRole[] = ['admin', 'manager', 'user'];

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={errors.name ? 'error' : ''}
          placeholder="Enter user's full name"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={errors.email ? 'error' : ''}
          placeholder="Enter user's email address"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select
          id="role"
          value={formData.role}
          onChange={(e) => handleInputChange('role', e.target.value as UserRole)}
        >
          {userRoles.map(role => (
            <option key={role} value={role}>
              {getUserRoleDisplay(role)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => handleInputChange('isActive', e.target.checked)}
          />
          Active User
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {user ? 'Update User' : 'Create User'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;