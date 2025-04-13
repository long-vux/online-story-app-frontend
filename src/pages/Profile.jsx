import { toast } from 'react-toastify';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiEdit, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
const { jwtDecode } = require("jwt-decode");


const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [editData, setEditData] = useState({ username: "", email: "", contact_info: "" });
  const API_URL = process.env.REACT_APP_API_URL;
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const token = JSON.parse(localStorage.getItem("user"));
  const userId = jwtDecode(token).userId;

  const fetchUser = async () => {
    try {
      const url = `${API_URL}user/${userId}`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200)
        setUser(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleEditClick = () => {
    setEditData({
      username: user?.username || "",
      email: user?.email || "",
      contact_info: user?.contact_info || "",
    });
    setShowModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API_URL}user/${userId}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        toast.success('Profile updated successfully!');
        fetchUser();
      }
      setShowModal(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const res = await axios.put(
        `${API_URL}user/${userId}/avatar`,
        { avatar: file },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      if (res.status === 200) {
        toast.success('Avatar updated successfully!');
        fetchUser();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    // ... validation checks ...
    try {
      const res = await axios.put(
        `${API_URL}user/change-password/${userId}`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        toast.success('Password updated successfully!');
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } 
    }
    catch (err) {
      console.log('Error details:', err.response?.data);
      setError(err.response?.data.message);
    }
  }

  const togglePasswordForm = () => setShowPasswordForm((prev) => !prev);

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Profile</h2>
        <button onClick={handleEditClick} className="text-gray-500 hover:text-black">
          <FiEdit size={24} />
        </button>
      </div>

      {/* Main Profile Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2 gap-6">
        {/* Info */}
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg shadow-sm w-full md:w-2/3">
          <div>
            <p className="text-sm text-gray-500">Username</p>
            <p className="text-base font-semibold text-gray-800">{user.username}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-base font-semibold text-gray-800">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Contact</p>
            <p className="text-base font-semibold text-gray-800">{user.contact_info}</p>
          </div>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-28 h-28 border-2 border-blue-500 rounded-full flex items-center justify-center overflow-hidden bg-gray-100 shadow-md">
            {user.avatar ? (
              <>
                <img
                  src={`http://localhost:5000/uploads/avatars/${user.avatar}`}
                  alt="avatar"
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setPreviewUrl(`http://localhost:5000/uploads/avatars/${user.avatar}`)}
                />
                {previewUrl && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded shadow-lg">
                      <img src={previewUrl} alt="Preview" className="max-h-[80vh] max-w-[90vw]" />
                      <button onClick={() => setPreviewUrl(null)} className="mt-4 text-red-500 font-bold">Close</button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <FaRegUser className="w-16 h-16 text-gray-400" />
            )}

          </div>
          <label className="text-sm text-blue-600 cursor-pointer hover:underline font-medium">
            Change Avatar
            <input type="file" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>
      </div>


      {/* Change Password (dropdown) */}
      <div className="mt-6">
        <button
          className="flex items-center gap-2 text-blue-600 font-medium"
          onClick={togglePasswordForm}
        >
          Change Password
          {showPasswordForm ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {showPasswordForm && (
          <form className="flex flex-col  space-y-4 bg-gray-50 p-4 rounded-lg shadow-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                value={passwordData.currentPassword}
                onChange={(e) => {
                  setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  setError(null);
              }}
                type="password"
                placeholder="Current Password"
                required
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                value={passwordData.newPassword}
                onChange={(e) => {setPasswordData({ ...passwordData, newPassword: e.target.value })
              
                setError(null);}}
                type="password"
                placeholder="New Password"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                value={passwordData.confirmPassword}
                onChange={(e) => {setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                setError(null);
              }}
                type="password"
                placeholder="Confirm New Password"
                className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-medium py-2 px-4 rounded-md"
              onClick={handleChangePassword}
            >
              Update Password
            </button>
          </form>

        )}
      </div>

      {/* Modal for Edit Profile */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                type="text"
                value={editData.username}
                onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                placeholder="Username"
                className="input w-full"
              />
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                placeholder="Email"
                className="input w-full"
              />
              <input
                type="text"
                value={editData.contact_info}
                onChange={(e) => setEditData({ ...editData, contact_info: e.target.value })}
                placeholder="Contact Info"
                className="input w-full"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-gray-600 hover:text-black"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white py-1 px-4 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
