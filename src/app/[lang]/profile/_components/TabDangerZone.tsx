'use client';
import { signOut } from 'next-auth/react';
import { useTranslation } from '@/hooks/useTranslation';

export default function TabDangerZone({ email }: { email: string }) {
  const { t } = useTranslation();

  const handleSignOut = async () => {
    if (!confirm(t('profile.signOutConfirm'))) return;
    await signOut({ callbackUrl: '/', redirect: true });
  };

  const handleClearCache = async () => {
    if (!confirm(t('profile.clearCacheConfirm'))) return;
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
    }
    await signOut({ callbackUrl: '/', redirect: true });
  };

  const exportData = async () => {
    try {
      const res = await fetch('/api/export-user-data', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
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
    } catch {
      alert(t('profile.exportError'));
    }
  };

  const sections = [
    {
      color: 'blue',
      title: t('profile.exportDataTitle'),
      desc: t('profile.exportDataDescription'),
      onClick: exportData,
      btnLabel: t('profile.exportDataButton'),
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      ),
    },
    {
      color: 'orange',
      title: t('profile.clearCacheTitle'),
      desc: t('profile.clearCacheDescription'),
      onClick: handleClearCache,
      btnLabel: t('profile.clearCacheButton'),
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      ),
    },
    {
      color: 'red',
      title: t('profile.signOutTitle'),
      desc: t('profile.signOutDescription'),
      onClick: handleSignOut,
      btnLabel: t('profile.signOutButton'),
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      ),
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {sections.map(({ color, title, desc, onClick, btnLabel, icon }) => (
        <div
          key={color}
          className={`p-4 sm:p-4 border border-${color}-300 dark:border-${color}-700 rounded-lg bg-${color}-50 dark:bg-${color}-900/20`}
        >
          <h3 className={`text-base sm:text-lg font-semibold text-${color}-600 dark:text-${color}-400 mb-2`}>
            {title}
          </h3>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
            {desc}
          </p>
          <button
            onClick={onClick}
            className={`w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-2 bg-${color}-600 text-white rounded-lg hover:bg-${color}-700 transition flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {icon}
            </svg>
            {btnLabel}
          </button>
        </div>
      ))}
    </div>
  );
}