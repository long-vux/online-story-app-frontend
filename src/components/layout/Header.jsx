import React from "react";
import logo from "../../assets/Logo.svg";
import notificationIcon from "../../assets/notification.svg";
import userIcon from "../../assets/user-icon.png";
import { useNavigate } from "react-router-dom";

// Header componen
const Header = ({ themeMode, toggleThemeMode }) => {
  const navigate = useNavigate();

  return (
    <div className={`flex items-center justify-between w-full h-16 bg-gray-100 border-b-2 border-gray-800 px-8 sticky top-0 z-10 ${
      themeMode === "night" ? "opacity-50" : ""
    }`}>
      <button onClick={() => navigate("/")}>
        <img src={logo} alt="Yuki Logo" className="ml-2 h-10" />
      </button>

      <button
          onClick={toggleThemeMode}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Switch to {themeMode === "day" ? "Night" : "Day"} Mode
        </button>

      <input
        type="text"
        placeholder="Search here"
        className="w-full max-w-md px-4 py-1 border border-gray-800 rounded-[50px] bg-gray-100 text-gray-800"
      />
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img src={notificationIcon} alt="Notifications" className="h-9" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            2
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <img src={userIcon} alt="User" className="h-12 w-12 rounded-full" />
          <div>
            <span className="block text-lg font-bold text-gray-900">Krowl Bell</span>
            <span className="text-blue-600 text-sm">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
