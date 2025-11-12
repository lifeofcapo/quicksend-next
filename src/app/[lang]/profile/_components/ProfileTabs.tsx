'use client';
import { useState } from 'react';
import TabProfileInfo from './TabProfileInfo';
import TabTenty from './TabTenty';
import TabEmailValidation from './TabEmailValidation';
import TabDangerZone from './TabDangerZone';
import TabNotifications from './TabNotifications';

const tabs = [
  { id: 'profile', label: 'Profile Info' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'tenty', label: 'Tenty' },
  { id: 'email', label: 'Email Validation' },
  { id: 'danger', label: 'Danger Zone' },
];

export default function ProfileTabs({ sessionUser, userData }: any) {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-500'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && <TabProfileInfo user={sessionUser} userData={userData} />}
      {activeTab === 'notifications' && <TabNotifications />}
      {activeTab === 'tenty' && <TabTenty userData={userData} />}
      {activeTab === 'email' && <TabEmailValidation email={sessionUser.email} />}
      {activeTab === 'danger' && <TabDangerZone email={sessionUser.email} />}
    </div>
  );
}
