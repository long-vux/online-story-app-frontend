import React, { useState } from 'react';

const Profile = () => {
  // Giả lập dữ liệu người dùng (thay bằng API sau)
  const [user, setUser] = useState({
    username: 'user1',
    email: 'user1@example.com',
    avatar: 'https://via.placeholder.com/150', // URL ảnh đại diện
    contact_info: '0123 456 789',
  });

  // State cho form chỉnh sửa thông tin
  const [editUser, setEditUser] = useState({ ...user });

  // State cho form đổi mật khẩu
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  // State để hiển thị thông báo lỗi hoặc thành công
  const [message, setMessage] = useState('');

  // Xử lý cập nhật thông tin người dùng
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // Logic gọi API để cập nhật thông tin
    console.log('Cập nhật thông tin:', editUser);
    setUser({ ...editUser });
    setMessage('Cập nhật thông tin thành công!');
    setTimeout(() => setMessage(''), 3000); // Ẩn thông báo sau 3 giây
  };

  // Xử lý đổi mật khẩu
  const handleChangePassword = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmNewPassword } = passwordData;

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (newPassword !== confirmNewPassword) {
      setMessage('Mật khẩu mới và xác nhận mật khẩu không khớp!');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // Logic gọi API để đổi mật khẩu
    console.log('Đổi mật khẩu:', { currentPassword, newPassword });
    setMessage('Đổi mật khẩu thành công!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Thông báo */}
      {message && (
        <div
          className={`p-3 mb-4 rounded ${
            message.includes('thành công') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      {/* Tiêu đề */}
      <h2 className="text-2xl font-semibold mb-6">Hồ sơ người dùng</h2>

      {/* Form chỉnh sửa thông tin */}
      <form onSubmit={handleUpdateProfile} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Thông tin cá nhân</h3>

        {/* Avatar */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Ảnh đại diện</label>
          <div className="flex items-center space-x-4">
            <img
              src={editUser.avatar}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover"
            />
            <input
              type="text"
              value={editUser.avatar}
              onChange={(e) => setEditUser({ ...editUser, avatar: e.target.value })}
              placeholder="Nhập URL ảnh đại diện"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={editUser.username}
            onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Contact Info */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Thông tin liên hệ</label>
          <input
            type="text"
            value={editUser.contact_info}
            onChange={(e) => setEditUser({ ...editUser, contact_info: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Số điện thoại hoặc thông tin liên hệ"
          />
        </div>

        {/* Nút cập nhật */}
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Cập nhật
          </button>
        </div>
      </form>

      {/* Form đổi mật khẩu */}
      <form onSubmit={handleChangePassword} className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Đổi mật khẩu</h3>

        {/* Mật khẩu hiện tại */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Mật khẩu hiện tại</label>
          <input
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, currentPassword: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Mật khẩu mới */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Mật khẩu mới</label>
          <input
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Xác nhận mật khẩu mới */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Xác nhận mật khẩu mới</label>
          <input
            type="password"
            value={passwordData.confirmNewPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Nút đổi mật khẩu */}
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Đổi mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;