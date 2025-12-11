'use client';

import { useState, useEffect } from 'react';
import TabProfileInfo from './TabProfileInfo';
import TabTenty from './TabTenty';
import TabEmailValidation from './TabEmailValidation';
import TabDangerZone from './TabDangerZone';
import TabNotifications from './TabNotifications';
import { useTranslation } from '@/hooks/useTranslation';

const managerTabs = [
  { id: 'manager_dashboard', label: 'managerDashboard' },
  { id: 'manager_requests', label: 'tentyRequests' },
];

const userTabs = [
  { id: 'profile', label: 'profileInfo' },
  { id: 'notifications', label: 'notifications' },
  { id: 'tenty', label: 'tenty' },
  { id: 'email', label: 'emailValidation' },
  { id: 'danger', label: 'dangerZone' },
];

export default function ProfileTabs({ sessionUser, userData, isManager }: any) {
  const { t } = useTranslation(); 
  const tabs = isManager ? managerTabs : userTabs;

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (isManager && activeTab === 'manager_requests') {
      fetch('/api/manager/tenty')
        .then(res => res.json())
        .then(data => setRequests(data.requests || []));
    }
  }, [isManager, activeTab]);

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
            {t(`profile.${tab.label}`)}
          </button>
        ))}
      </div>

      {!isManager && (
        <>
          {activeTab === 'profile' && (
            <TabProfileInfo user={sessionUser} userData={userData} />
          )}

          {activeTab === 'notifications' && <TabNotifications />}

          {activeTab === 'tenty' && <TabTenty/>}

          {activeTab === 'email' && (
            <TabEmailValidation email={sessionUser.email} />
          )}

          {activeTab === 'danger' && (
            <TabDangerZone email={sessionUser.email} />
          )}
        </>
      )}

      {isManager && (
        <>
          {activeTab === 'manager_dashboard' && (
            <ManagerDashboard sessionUser={sessionUser} />
          )}
          {activeTab === 'manager_requests' && (
            <ManagerRequestList requests={requests} />
          )}
        </>
      )}
    </div>
  );
}

function ManagerDashboard({ sessionUser }: any) {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t('profile.managerDashboard')}</h2> 

      <div className="p-5 bg-gray-50 dark:bg-gray-700/30 rounded-lg shadow">
        <p><b>{t('profile.name')}:</b> {sessionUser.name}</p> 
        <p><b>{t('profile.email')}:</b> {sessionUser.email}</p> 
        <p className="text-gray-500 mt-3">
          {t('profile.managerRoleDescription')}
        </p>
      </div>
    </div>
  );
}

function ManagerRequestList({ requests }: any) {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t('profile.allTentyRequests')}</h2>

      <div className="space-y-4">
        {requests.map((req: any) => (
          <a
            key={req.id}
            href={`/manager/tenty/${req.id}`}
            className="block p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{req.track_name}</h3>
                <p className="text-gray-500 text-sm">
                  {req.artist_nickname}
                </p>
              </div>

              <span
                className="px-2 py-1 text-sm rounded bg-gray-200 dark:bg-gray-800"
              >
                {req.status}
              </span>
            </div>
          </a>
        ))}

        {requests.length === 0 && (
          <p className="text-gray-500">{t('profile.noRequestsYet')}</p>
        )}
      </div>
    </div>
  );
}