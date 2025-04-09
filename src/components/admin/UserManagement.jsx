import React, { useEffect, useState } from 'react';
import { FiTrash2 } from "react-icons/fi";
import axios from 'axios';
import { toast } from 'react-toastify';

const UserManagement = ({token}) => {
  const [users, setUsers] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}user/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200)
        setUsers(response.data);
      else
        toast.error('Failed to fetch users');
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${API_URL}user/${selectedUserId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        toast.success("Delete user successfully!");
        fetchUsers();
        setShowConfirmModal(false);
        setSelectedUserId(null);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const confirmDelete = (userId) => {
    setSelectedUserId(userId);
    setShowConfirmModal(true);
  };

  const closeModal = () => {
    setShowConfirmModal(false);
    setSelectedUserId(null);
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
              <td className="p-2 border text-center">{user.username}</td>
              <td className="p-2 border text-center">{user.email}</td>
              <td className="p-2 border text-center">{user.role}</td>
              <td className="p-2 border text-center">
                {user.role !== 'Admin' && (
                  <button
                    className="bg-red-500 text-white px-2 py-2 rounded"
                    onClick={() => confirmDelete(user._id)}
                  >
                    <FiTrash2 />
                  </button>
                )}
                </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirm Delete Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this user?</h2>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
