import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Notification from '../pages/Notification';
import StoryDetail from '../pages/StoryDetail';
import Header from '../components/layout/Header';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Profile from '../pages/Profile';
import ReadingView from '../components/reader/ReadingView';
import { DayModeStrategy, NightModeStrategy } from '../components/reader/DayNightStrategies';

const MainRoutes = () => {
  const [themeMode, setThemeMode] = useState(localStorage.getItem("themeMode") || "day"); // Chế độ giao diện
  const location = useLocation();

  // Tạo instances của DayNightStrategy
  const dayModeStrategy = new DayModeStrategy();
  const nightModeStrategy = new NightModeStrategy();

  // Chọn chiến lược giao diện
  const themeStrategy = themeMode === "day" ? dayModeStrategy : nightModeStrategy;

  // Áp dụng theme toàn cục
  useEffect(() => {
    themeStrategy.applyTheme();
  }, [themeMode]);

  // Hàm chuyển đổi chế độ giao diện
  const toggleThemeMode = () => {
    const newMode = themeMode === "day" ? "night" : "day";
    setThemeMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  // Các đường dẫn không cần hiển thị Header và Navbar
  const hideLayout = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && (
        <Header
          themeMode={themeMode}
          toggleThemeMode={toggleThemeMode}
        />
      )}

      <div className="flex flex-1">
        {!hideLayout && (
          <Navbar
            themeMode={themeMode}
          />
        )}

        {/* Nội dung chính (các route) */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage themeMode={themeMode} />} />
            <Route path="/profile" element={<Profile themeMode={themeMode} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/notifications" element={<Notification themeMode={themeMode} />} />
            <Route path="/story-detail/:storyId" element={<StoryDetail themeMode={themeMode} />} />
            <Route path="/reading-view/:chapterId" element={<ReadingView themeStrategy={themeStrategy} />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainRoutes;