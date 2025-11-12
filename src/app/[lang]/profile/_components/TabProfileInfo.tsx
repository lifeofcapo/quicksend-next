'use client';

import Image from 'next/image';
import { format } from 'date-fns';

interface TabProfileInfoProps {
  user: any;
  userData: {
    avatar_url?: string;
    company_name?: string;
    emails_sent?: number;
    created_at?: string;
    status?: string;
    active_plan?: string;
    subscription_end?: string;
  };
}

export default function TabProfileInfo({ user, userData }: TabProfileInfoProps) {
  const avatarSrc =
    userData?.avatar_url ||
    user?.image ||
    '/default-avatar.png';

  return (
    <div className="space-y-6">
      {/* Основная информация */}
      <div className="flex items-center gap-6 mb-6">
        <div className="relative w-20 h-20">
          <Image
            src={avatarSrc}
            alt="avatar"
            fill
            className="rounded-full border object-cover"
            unoptimized // важно для внешних URL (Google, Supabase)
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user?.name ?? '—'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{user?.email ?? '—'}</p>
        </div>
      </div>

      {/* Карточки с основной статистикой */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-gray-500">Active Plan</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {userData?.active_plan ?? 'Free'}
          </p>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm text-gray-500">Subscription Ends</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {userData?.subscription_end
              ? format(new Date(userData.subscription_end), 'MMM d, yyyy')
              : '—'}
          </p>
        </div>

        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-sm text-gray-500">Account Status</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
            {userData?.status ?? 'active'}
          </p>
        </div>
      </div>

      {/* Дополнительная информация */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Account Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Company</p>
            <p>{userData?.company_name ?? '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Emails Sent</p>
            <p>{userData?.emails_sent ?? 0}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Registered</p>
            <p>
              {userData?.created_at
                ? format(new Date(userData.created_at), 'MMM d, yyyy')
                : '—'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
            <p>{user?.email ?? '—'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
