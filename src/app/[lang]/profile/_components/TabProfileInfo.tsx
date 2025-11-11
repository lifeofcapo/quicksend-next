'use client';
import Image from 'next/image';

export default function TabProfileInfo({ user, userData }: any) {
  return (
    <div>
      <div className="flex items-center gap-6 mb-6">
        <Image
          src={user.image || '/default-avatar.png'}
          alt="avatar"
          width={80}
          height={80}
          className="rounded-full border"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-gray-500">Active Plan</p>
          <p className="text-xl font-bold">{userData.active_plan ?? 'Free'}</p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm text-gray-500">Subscription ends</p>
          <p className="text-xl font-bold">{userData.subscription_end ?? '—'}</p>
        </div>
      </div>
    </div>
  );
}
