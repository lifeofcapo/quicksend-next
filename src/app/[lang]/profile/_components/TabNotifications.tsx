'use client';
import { useEffect, useState } from 'react';
import { Bell, Check, Trash2, RefreshCw, BellOff } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface Notification {
  id: string;
  title: string;
  message: string;
  created_at: string;
  read: boolean;
  type?: 'info' | 'warning' | 'success' | 'error';
}

export default function TabNotifications() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const json = await res.json();
      if (json.notifications) setNotifications(json.notifications);
    } catch (err) {
      console.error('Error loading notifications:', err);
    }
  };

  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      await fetchNotifications();
      setLoading(false);
    };

    loadNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}/read`, {
        method: 'POST',
      });
      
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await fetch('/api/notifications/read-all', {
        method: 'POST',
      });
      
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchNotifications();
    setIsRefreshing(false);
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationTypeStyle = (type?: string) => {
    const styles = {
      info: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20',
      warning: 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20',
      success: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20',
      error: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20',
      default: 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800',
    };
    
    return styles[type as keyof typeof styles] || styles.default;
  };

  const getNotificationIcon = (type?: string) => {
    const icons = {
      info: 'ℹ️',
      warning: '⚠️',
      success: '✅',
      error: '❌',
      default: '📢',
    };
    
    return icons[type as keyof typeof icons] || icons.default;
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return t('profile.justNow');
    if (diffMins < 60) return t('profile.minutesAgo', { count: diffMins });
    if (diffHours < 24) return t('profile.hoursAgo', { count: diffHours });
    if (diffDays < 7) return t('profile.daysAgo', { count: diffDays });
    
    return date.toLocaleDateString();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Bell className="text-blue-600 dark:text-blue-400 w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {t('profile.notifications')}
            </h3>
            {unreadCount > 0 && (
              <p className="text-sm text-blue-600 dark:text-blue-400">
                {t('profile.unreadCount', { count: unreadCount })}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={loading || isRefreshing}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition disabled:opacity-50"
            title={t('profile.refresh')}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          
          {notifications.length > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
              className="p-2 text-green-500 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              title={t('profile.markAllAsRead')}
            >
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      {notifications.length > 0 && (
        <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              filter === 'all'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
            }`}
          >
            {t('profile.allNotifications')} ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              filter === 'unread'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
            }`}
          >
            {t('profile.unreadNotifications')} ({unreadCount})
          </button>
        </div>
      )}

      {/* Notifications List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 dark:text-gray-400">{t('profile.loadingNotifications')}</p>
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
            <BellOff className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300">
              {filter === 'unread' 
                ? t('profile.noUnreadNotifications')
                : t('profile.noNotificationsYet')
              }
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t('profile.notificationsWillAppearHere')}
            </p>
          </div>
        </div>
      ) : (
        <>

          {/* Notifications */}
          <ul className="space-y-3">
            {filteredNotifications.map((n) => (
              <li
                key={n.id}
                className={`p-4 rounded-xl border transition-all hover:shadow-md ${
                  n.read 
                    ? 'opacity-80'
                    : 'border-l-4 border-l-blue-500'
                } ${getNotificationTypeStyle(n.type)}`}
              >
                <div className="flex gap-3">
                  {/* Notification Icon */}
                  <div className="shrink-0 pt-1 text-lg">
                    {getNotificationIcon(n.type)}
                  </div>

                  {/* Content */}
                  <div className="grow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`font-medium ${
                        n.read 
                          ? 'text-gray-700 dark:text-gray-400'
                          : 'text-gray-900 dark:text-gray-100'
                      }`}>
                        {n.title}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTimeAgo(n.created_at)}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-400 mb-3">
                      {n.message}
                    </p>

                    {/* Actions */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                        {new Date(n.created_at).toLocaleString()}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        {!n.read && (
                          <button
                            onClick={() => handleMarkAsRead(n.id)}
                            className="text-xs text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-2 py-1 rounded transition flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            {t('profile.markAsRead')}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}