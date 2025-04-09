import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from "react-icons/fi";
import axios from 'axios';
const {toast} = require('react-toastify');

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', email: '', role: 'Reader' });
  const [users, setUsers] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  
  const user = JSON.parse(localStorage.getItem('user'));
  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      console.log('toekn',user);
      const response = await axios.get(`${API_URL}user/`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user}`
          }
        }
      );
      setUsers(response.data);
    }
    catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle editing user
  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}user/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user}`
        }
      });
      toast.success('Delete user successfully');
      fetchUsers();
    }
    catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    // Logic để thêm user (gọi API)
    console.log('Thêm user:', newUser);
    setIsModalOpen(false);
    setNewUser({ username: '', email: '', role: 'Reader' });
  };

  return (
    <div className="p-6 pt-0 flex-1 relative">
      <h3 className="text-2xl font-semibold mb-4">User Management</h3>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="p-2 border  text-center">{user.username}</td>
              <td className="p-2 border  text-center">{user.email}</td>
              <td className="p-2 border  text-center">{user.role}</td>
              <td className="p-2 border  text-center">
                {/* <button className="bg-blue-500 text-white px-2 py-2 rounded mr-2" onClick={() => handleEdit(user)}><FiEdit /></button> */}
                <button className="bg-red-500 text-white px-2 py-2 rounded" onClick={() => handleDelete(user._id)}><FiTrash2 /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Nút Thêm mới ở góc phải dưới */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600"
      >
        +
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Create new account</h3>
            <form onSubmit={handleAddUser}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option value="Reader">Reader</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Hủy
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;