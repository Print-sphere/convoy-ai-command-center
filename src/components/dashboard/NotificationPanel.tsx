
import React from 'react';
import { Bell } from 'lucide-react';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  time: string;
}

interface NotificationPanelProps {
  notifications: Notification[];
}

const NotificationPanel = ({ notifications }: NotificationPanelProps) => {
  const getTypeStyles = (type: Notification['type']) => {
    switch(type) {
      case 'error': return 'bg-convoy-red';
      case 'warning': return 'bg-convoy-amber';
      case 'info': return 'bg-convoy-blue';
      default: return 'bg-convoy-blue';
    }
  };
  
  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Bell className="w-4 h-4 mr-2" />
          <h3 className="font-semibold">Notifications</h3>
        </div>
        {notifications.length > 0 && (
          <div className="bg-convoy-blue text-xs px-2 py-0.5 rounded-full">
            {notifications.length} new
          </div>
        )}
      </div>
      
      <div className="space-y-2 max-h-32 overflow-auto scrollbar-thin">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className="flex items-start py-1 border-b border-gray-700 last:border-0">
              <div className={`w-2 h-2 rounded-full mr-2 mt-1.5 ${getTypeStyles(notification.type)}`} />
              <div className="flex-1">
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-2 text-gray-500 text-sm">
            No new notifications
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
