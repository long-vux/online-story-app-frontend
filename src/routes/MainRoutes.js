import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar'; // Đảm bảo đường dẫn đúng
import Notifications from '../pages/Notification'; // Đảm bảo đường dẫn đúng
import StoryDetail from '../pages/StoryDetail';
import Header from '../components/layout/Header';
import HomePage from '../pages/HomePage';
import ChapterItem from '../pages/ChapterItem';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Notification from '../pages/Notification';

const AdminRoutes = () => {
  const [activeSection, setActiveSection] = useState('story'); // Quản lý trạng thái active cho navbar

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Layout chính */}
      <div className="flex flex-1">
        {/* Sidebar (Navbar) bên trái */}
        <Navbar setActiveSection={setActiveSection} activeSection={activeSection} />

        {/* Nội dung chính (các route) */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/story-detail" element={<StoryDetail />} />
            <Route path="/chapter-item" element={<ChapterItem />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminRoutes;