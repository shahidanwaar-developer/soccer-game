import { useState } from 'react';
import { Icon } from '@iconify/react';
import { PageHeader } from '../components/ui/Utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNotifications } from '../context/NotificationContext';

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications =
    filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  const getNotificationIcon = (type: string) => {
    const icons: Record<string, string> = {
      opponent_found: 'solar:bell-bold',
      tournament_reminder: 'solar:bell-bold',
      match_result: 'solar:bell-bold',
      transfer: 'solar:transfer-horizontal-bold',
      bonus: 'solar:gift-bold',
      deposit: 'solar:wallet-bold',
      system: 'solar:info-circle-bold',
      match_invitation: 'solar:mail-bold',
    };
    return icons[type] || 'solar:bell-bold';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Notifications" subtitle={`You have ${notifications.filter((n) => !n.read).length} unread notifications`} />
        {notifications.filter((n) => !n.read).length > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'unread'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Unread ({notifications.filter((n) => !n.read).length})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <Card
              key={notif.id}
              className={`flex items-start gap-4 ${!notif.read ? 'border-blue-600 bg-gray-800/50' : ''}`}
            >
              <div className={`p-3 rounded-lg shrink-0 ${
                !notif.read ? 'bg-blue-900' : 'bg-gray-700'
              }`}>
                <Icon icon={getNotificationIcon(notif.type)} className="text-2xl text-blue-400" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-white">{notif.title}</h3>
                  {!notif.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-2" />
                  )}
                </div>
                <p className="text-gray-300 text-sm mb-2">{notif.message}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-500">{notif.timestamp}</p>
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className="text-xs text-gray-500 hover:text-red-400 font-medium ml-auto"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <Icon icon="solar:inbox-bold" className="text-4xl text-gray-500 mb-4" />
            <p className="text-gray-400">No {filter === 'unread' ? 'unread' : ''} notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}
