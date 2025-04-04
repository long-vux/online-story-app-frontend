import React from "react";

const NavItem = ({ icon, label, isActive, onClick }) => {
  return (
    <li
      className={`flex items-center py-3 px-6 rounded-lg cursor-pointer text-xl ${
        isActive ? "bg-[#f4b333]" : "hover:orange-400"
      }`}
      onClick={onClick}
    >
      <img src={icon} alt={label} className="w-8 h-8 mr-4" /> {label}
    </li>
  );
};

export default NavItem;
