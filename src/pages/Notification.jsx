import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // số lượng thông báo mỗi trang

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${API_URL}notifications`);
        setNotifications(res.data);
      } catch (err) {
        console.error('Lỗi khi lấy thông báo:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Tính tổng số trang
  const totalPages = Math.ceil(notifications.length / itemsPerPage);

  // Lấy danh sách thông báo cho trang hiện tại
  const paginatedNotis = notifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white p-4 relative">
      <h3 className="text-xl font-semibold mb-4">Notifications</h3>

      {loading ? (
        <p>Đang tải thông báo...</p>
      ) : notifications.length === 0 ? (
        <p>Không có thông báo nào.</p>
      ) : (
        <>
          <div className="space-y-2 mb-4">
            {paginatedNotis.map((noti) => (
              <div
                key={noti._id}
                className={`p-3 rounded-lg flex justify-between items-center ${
                  noti.isRead ? 'bg-gray-700 text-white' : 'bg-white text-black'
                }`}
              >
                <div>
                  <p className="text-sm">{noti.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(noti.createdAt).toLocaleString()}
                  </p>
                </div>
                {!noti.isRead && (
                  <span className="ml-4 w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-1 bg-gray-700 rounded disabled:opacity-50"
            >
              Trang trước
            </button>
            <span className="text-sm">
              Trang {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-1 bg-gray-700 rounded disabled:opacity-50"
            >
              Trang sau
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Notification;
