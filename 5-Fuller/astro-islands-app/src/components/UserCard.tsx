// NES Demo: Try edits from README Scenario 1 to see Next Edit Suggestions in action

import React, { useState } from 'react';
import type { UserProfile } from '../types';

interface UserCardProps {
  user: UserProfile;
  showActions?: boolean;
  onEdit?: (user: UserProfile) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, showActions = true, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEditClick = () => {
    if (onEdit) {
      onEdit(user);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center space-x-4">
        <img 
          src={user.avatar || '/default-avatar.png'} 
          alt={user.name}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
        
        {showActions && (
          <div className="flex space-x-2">
            <button 
              onClick={handleEditClick}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              {isExpanded ? 'Less' : 'More'}
            </button>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <h4 className="font-medium mb-2">Preferences:</h4>
          <p>Theme: {user.preferences.theme}</p>
          <p>Notifications: {user.preferences.notifications ? 'Enabled' : 'Disabled'}</p>
          <p>Language: {user.preferences.language}</p>
        </div>
      )}
    </div>
  );
};

export default UserCard;