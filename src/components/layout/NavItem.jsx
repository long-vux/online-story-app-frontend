import React from "react";

const NavItem = ({ icon, label, isActive, onClick, themeMode }) => {
  return (
    <li
      className={`flex items-center py-3 px-6 rounded-lg cursor-pointer text-xl transition-colors duration-200 ${
        isActive
          ? themeMode === "day"
            ? "bg-[#f4b333] text-white"
            : "bg-orange-600 text-white"
          : themeMode === "day"
          ? "text-white hover:bg-orange-400"
          : "text-gray-200 hover:bg-gray-700"
      }`}
      onClick={onClick}
    >
      <span className="text-2xl mr-4">{icon}</span>
      {label}
    </li>
  );
};

export default NavItem;