'use client';
import { useEffect, useState } from 'react';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { Bell } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  created_at: string;
  read: boolean;
}

export default function TabNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      const { data, error } = await supabaseAdmin
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setNotifications(data);
      setLoading(false);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="text-blue-500 w-5 h-5" />
        <h3 className="text-xl font-semibold">Notifications</h3>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : notifications.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No notifications yet.</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`p-3 rounded-lg border ${
                n.read
                  ? 'bg-gray-50 dark:bg-gray-800 border-gray-700'
                  : 'bg-blue-50 dark:bg-blue-900/30 border-blue-400'
              }`}
            >
              <h4 className="font-medium text-gray-900 dark:text-gray-200">{n.title}</h4>
              <p className="text-gray-700 dark:text-gray-400">{n.message}</p>
              <span className="text-xs text-gray-400">
                {new Date(n.created_at).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}