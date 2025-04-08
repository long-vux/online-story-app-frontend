import React from 'react';

const Notification = () => {
  // Giả lập dữ liệu thông báo (thay bằng API sau)
  const notifications = [
    { id: '1', message: 'One piece, Chapter 1012 has been added!', time: '45 minutes ago' },
    { id: '2', message: 'Solo leveling, Chapter 124 has been added!', time: '2 hours ago' },
    { id: '3', message: 'Versatile mage, Chapter 165 has been added!', time: '2 hours ago' },
  ];

  return (
    <div className="w-100 h-screen bg-gray-900 text-white p-4 border-l border-blue-500">
      {/* Tiêu đề */}
      <h3 className="text-xl font-semibold mb-4">Notifications</h3>


      {/* Danh sách thông báo */}
      <div className="space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-3 bg-white text-black rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="text-sm">{notification.message}</p>
              <p className="text-xs text-gray-500">{notification.time}</p>
            </div>
            <div className="flex space-x-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;