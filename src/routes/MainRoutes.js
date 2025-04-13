import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Notification from '../pages/Notification';
import StoryDetail from '../pages/StoryDetail';
import Header from '../components/layout/Header';
import HomePage from '../pages/HomePage';
import ChapterItem from '../pages/ChapterItem';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Profile from '../pages/Profile';

const MainRoutes = () => {
  const [activeSection, setActiveSection] = useState('story');
  const location = useLocation();

  // Các đường dẫn không cần hiển thị Header và Navbar
  const hideLayout = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {!hideLayout && <Header />}

      <div className="flex flex-1">
        {!hideLayout && (
          <Navbar setActiveSection={setActiveSection} activeSection={activeSection} />
        )}

        {/* Nội dung chính (các route) */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage  />} />
            <Route path="/profile" element={<Profile/>} />
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

export default MainRoutes;
