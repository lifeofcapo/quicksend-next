'use client';
import { signOut } from 'next-auth/react';

export default function TabDangerZone({ email }: { email: string }) {
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete your account?')) return;

    const res = await fetch('/api/delete-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      await signOut({ callbackUrl: '/' });
    } else {
      alert('Failed to delete account');
    }
  };

  return (
    <div className="p-4 border border-red-300 dark:border-red-700 rounded-lg bg-red-50 dark:bg-red-900/20">
      <h3 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        This action will permanently delete your account and all data.
      </p>
      <button
        onClick={handleDelete}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Delete My Account
      </button>
    </div>
  );
}
