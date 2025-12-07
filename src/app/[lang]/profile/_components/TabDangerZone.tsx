'use client';
import { signOut } from 'next-auth/react';
import { useTranslation } from '@/hooks/useTranslation';

export default function TabDangerZone({ email }: { email: string }) {
  const { t } = useTranslation();

  const handleSignOut = async () => {
    if (!confirm(t('profile.signOutConfirm'))) return;

    // Полный выход с очисткой сессии
    await signOut({ 
      callbackUrl: '/',
      redirect: true 
    });
  };

  const handleClearCache = async () => {
    if (!confirm(t('profile.clearCacheConfirm'))) return;
    
    // Очистка localStorage и sessionStorage
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
    }
    
    await signOut({ 
      callbackUrl: '/',
      redirect: true 
    });
  };

  const exportData = async () => {
    try {
      const res = await fetch('/api/export-user-data', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const data = await res.json();
        
        // Создаем и скачиваем файл
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quicksend-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert(t('profile.exportSuccess'));
      } else {
        alert(t('profile.exportFailed'));
      }
    } catch (error) {
      alert(t('profile.exportError'));
    }
  };

  return (
    <div className="space-y-6">
      {/* Export Data Section */}
      <div className="p-4 border border-blue-300 dark:border-blue-700 rounded-lg bg-blue-50 dark:bg-blue-900/20">
        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
          {t('profile.exportDataTitle')}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t('profile.exportDataDescription')}
        </p>
        <button
          onClick={exportData}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {t('profile.exportDataButton')}
        </button>
      </div>

      {/* Clear Cache Section */}
      <div className="p-4 border border-orange-300 dark:border-orange-700 rounded-lg bg-orange-50 dark:bg-orange-900/20">
        <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-2">
          {t('profile.clearCacheTitle')}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t('profile.clearCacheDescription')}
        </p>
        <button
          onClick={handleClearCache}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {t('profile.clearCacheButton')}
        </button>
      </div>

      {/* Sign Out Section */}
      <div className="p-4 border border-red-300 dark:border-red-700 rounded-lg bg-red-50 dark:bg-red-900/20">
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
          {t('profile.signOutTitle')}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t('profile.signOutDescription')}
        </p>
        <button
          onClick={handleSignOut}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {t('profile.signOutButton')}
        </button>
      </div>
    </div>
  );
}