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
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import socket from '../socket';

const MainRoutes = () => {
  const [themeMode, setThemeMode] = useState(localStorage.getItem("themeMode") || "day");
  const [realtimeNoti, setRealtimeNoti] = useState(null);
  const location = useLocation();

  const dayModeStrategy = new DayModeStrategy();
  const nightModeStrategy = new NightModeStrategy();
  const themeStrategy = themeMode === "day" ? dayModeStrategy : nightModeStrategy;

  useEffect(() => {
    themeStrategy.applyTheme();
  }, [themeMode]);

  const toggleThemeMode = () => {
    const newMode = themeMode === "day" ? "night" : "day";
    setThemeMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const hideLayout = ['/login', '/register'].includes(location.pathname);

  useEffect(() => {
    // Lấy userId từ localStorage hoặc JWT decode
    const token = localStorage.getItem("user");
    const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

    if (userId) {
      // Gửi userId để join room
      socket.emit('subscribe', userId);
      console.log(`User ${userId} joined their room`);
    }

    const handleNewNoti = (data) => {
      setRealtimeNoti(data.message);
      toast.success(data.message);
      console.log(`📢 Notify user ${userId} about new chapteadfdsr:`, data);
      setTimeout(() => {
        setRealtimeNoti(null);
      }, 4000);
    };

    // Lắng nghe sự kiện new-chapter
    socket.on('new-chapter', handleNewNoti);

    console.log('Listening for new-chapter events'); // Log khi bắt đầu lắng nghe
    return () => {
      console.log('Stopped listening for new-chapter events'); // Log khi cleanup
      socket.off('new-chapter', handleNewNoti);
    };
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && (
        <Header themeMode={themeMode} toggleThemeMode={toggleThemeMode} />
      )}

      <div className="flex flex-1">
        {!hideLayout && <Navbar themeMode={themeMode} />}

        <div className="flex-1 relative">
          {/* ✅ Realtime toast badge chỉ hiển thị khi ở trang /notifications */}
          <AnimatePresence>
            {location.pathname === '/notifications' && realtimeNoti && (
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="fixed top-6 right-6 max-w-sm w-[90%] bg-blue-600 text-white px-6 py-4 rounded-xl shadow-2xl z-50"
              >
                <p className="text-sm font-medium">{realtimeNoti}</p>
              </motion.div>
            )}
          </AnimatePresence>

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
