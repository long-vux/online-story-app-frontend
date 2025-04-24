import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavSection from "./NavSection";
import {
  FaHome,
  FaCompass,
  FaBell,
  FaUser,
  FaList,
  FaCog,
  FaDonate,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { jwtDecode } from 'jwt-decode';

const pathToLabel = {
  "/": "Home",
  "/notifications": "Notifications",
  "/profile": "Profile",
  "/donate": "Donate",
  "/login": "Login",
  "/dashboard": "Dashboard",
};

const Navbar = ({ themeMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("user");
  let isAdmin = false;

  const [activeItem, setActiveItem] = useState("Home");

  if (isLoggedIn) {
    const user = jwtDecode(isLoggedIn);
    isAdmin = user.role === "Admin";
  }

  // 🔁 Update activeItem mỗi khi đường dẫn thay đổi
  useEffect(() => {
    const currentLabel = pathToLabel[location.pathname] || "Home";
    setActiveItem(currentLabel);
  }, [location.pathname]);

  // 🧠 Menu tùy biến theo trạng thái đăng nhập
  const menuItems = useMemo(
    () => ({
      Menu: [
        { label: "Home", icon: <FaHome />, link: "/" },
        { label: "Notifications", icon: <FaBell />, link: "/notifications" },
        isAdmin
          ? { label: "Dashboard", icon: <MdLeaderboard />, link: "/admin/dashboard" }
          : [],
      ],
      General: [
        { label: "Profile", icon: <FaUser />, link: "/profile" },
        { label: "Donate", icon: <FaDonate />, link: "/donate" },
        isLoggedIn
          ? { label: "Logout", icon: <FaSignOutAlt />, link: "/logout" }
          : { label: "Login", icon: <FaSignInAlt />, link: "/login" },
      ],
    }),
    [isLoggedIn]
  );

  // 🧭 Xử lý khi click
  const handleItemClick = (label, link) => {
    setActiveItem(label);
    if (label === "Logout") {
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      navigate(link);
    }
  };

  return (
    <nav
      className={`w-1/7 p-6 pt-[80px] shadow-lg transition-all duration-300 ${
        themeMode === "day"
          ? "bg-[#1b6fa8] text-white"
          : "bg-gray-800 text-gray-200 opacity-50"
      }`}
    >
      {Object.entries(menuItems).map(([section, items]) => (
        <NavSection
          key={section}
          title={section}
          items={items}
          activeItem={activeItem}
          handleItemClick={handleItemClick}
          themeMode={themeMode}
        />
      ))}
    </nav>
  );
};

export default Navbar;