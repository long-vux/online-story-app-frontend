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

const pathToLabel = {
  "/": "Home",
  "/discover": "Discover Comics",
  "/notifications": "Notifications",
  "/profile": "Profile",
  "/my-list": "My List",
  "/settings": "Settings",
  "/donate": "Donate",
  "/login": "Login",
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("user");

  const [activeItem, setActiveItem] = useState("Discover Comics");

  // 🔁 Update activeItem mỗi khi đường dẫn thay đổi
  useEffect(() => {
    const currentLabel = pathToLabel[location.pathname] || "Discover Comics";
    setActiveItem(currentLabel);
  }, [location.pathname]);

  // 🧠 Menu tùy biến theo trạng thái đăng nhập
  const menuItems = useMemo(() => ({
    Menu: [
      { label: "Home", icon: <FaHome />, link: "/" },
      { label: "Discover Comics", icon: <FaCompass />, link: "/discover" },
      { label: "Notifications", icon: <FaBell />, link: "/notifications" },
    ],
    General: [
      { label: "Profile", icon: <FaUser />, link: "/profile" },
      { label: "My List", icon: <FaList />, link: "/my-list" },
      { label: "Settings", icon: <FaCog />, link: "/settings" },
      { label: "Donate", icon: <FaDonate />, link: "/donate" },
      isLoggedIn
        ? { label: "Logout", icon: <FaSignOutAlt />, link: "/logout" }
        : { label: "Login", icon: <FaSignInAlt />, link: "/login" },
    ],
  }), [isLoggedIn]);

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
    <nav className="w-1/7 bg-[#1b6fa8] text-white p-6 pt-[80px] shadow-lg">
      {Object.entries(menuItems).map(([section, items]) => (
        <NavSection
          key={section}
          title={section}
          items={items}
          activeItem={activeItem}
          handleItemClick={handleItemClick}
        />
      ))}
    </nav>
  );
};

export default Navbar;
