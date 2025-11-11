'use client';
import { useState } from 'react';

export default function TabTenty({ userData }: any) {
  const [form, setForm] = useState({ trackUrl: '', reason: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST на FastAPI endpoint
    console.log('Tenty report submitted', form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          Track URL
        </label>
        <input
          type="url"
          value={form.trackUrl}
          onChange={e => setForm({ ...form, trackUrl: e.target.value })}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          Reason
        </label>
        <textarea
          value={form.reason}
          onChange={e => setForm({ ...form, reason: e.target.value })}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
          rows={3}
          required
        />
      </div>
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Submit Request
      </button>
    </form>
  );
}
