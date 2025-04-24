import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo.svg";
import userIcon from "../../assets/user-icon.png";
import { useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa"; // Import sun and moon icons
import { jwtDecode } from "jwt-decode";

const Header = ({ themeMode, toggleThemeMode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const user =  jwtDecode(storedUser);
    setUser(user);
    console.log("User data from localStorage:", user);
  }, []);

  return (
    <div
      className={`flex items-center justify-between w-full h-16 bg-gray-100 border-b-2 border-gray-800 px-8 sticky top-0 z-10 ${
        themeMode === "night" ? "opacity-50" : ""
      }`}
    >
      <button onClick={() => navigate("/")}>
        <img src={logo} alt="Yuki Logo" className="ml-2 h-10" />
      </button>

      

      <input
        type="text"
        placeholder="Search here"
        className="w-full max-w-md px-4 py-1 border border-gray-800 rounded-[50px] bg-gray-100 text-gray-800"
      />
      <div className="flex items-center space-x-6">
      <button
        onClick={toggleThemeMode}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center"
      >
        {themeMode === "day" ? <FaMoon className="text-lg" /> : <FaSun className="text-lg" />}
      </button>
        <div className="flex items-center space-x-3">
          <img src={`http://localhost:5000/uploads/avatars/${user?.avatar}` || userIcon} alt="User" className="h-12 w-12 rounded-full" />
          <div>
            <span className="block text-lg font-bold text-gray-900">{user?.username || "Guest"}</span>
            <span className="text-blue-600 text-sm">{user?.role || "Unverified"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
