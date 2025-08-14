// NES Demo: Try edits from README Scenario 4 to see Next Edit Suggestions in action

import React, { useState } from 'react';
import type { UserProfile } from '../types';

interface UserSettingsProps {
  user: UserProfile;
  onSave?: (updatedUser: UserProfile) => void;
}

const UserSettings: React.FC<UserSettingsProps> = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    theme: user.preferences.theme,
    notifications: user.preferences.notifications,
    language: user.preferences.language
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSave = () => {
    const updatedUser: UserProfile = {
      ...user,
      name: formData.name,
      email: formData.email,
      preferences: {
        theme: formData.theme as 'light' | 'dark',
        notifications: formData.notifications,
        language: formData.language
      }
    };

    if (onSave) {
      onSave(updatedUser);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">User Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Theme
          </label>
          <select
            name="theme"
            value={formData.theme}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <select
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="notifications"
            checked={formData.notifications}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">
            Enable notifications
          </label>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default UserSettings;