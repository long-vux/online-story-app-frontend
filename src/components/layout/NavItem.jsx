import React from "react";

const NavItem = ({ icon, label, isActive, onClick }) => {
  return (
    <li
      className={`flex items-center py-3 px-6 rounded-lg cursor-pointer text-xl transition-colors ${
        isActive ? "bg-[#f4b333]" : "hover:bg-orange-400"
      }`}
      onClick={onClick}
    >
      <span className="text-2xl mr-4">{icon}</span>
      {label}
    </li>
  );
};

export default NavItem;
