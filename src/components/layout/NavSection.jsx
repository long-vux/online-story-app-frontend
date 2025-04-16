import React from "react";
import NavItem from "./NavItem";

const NavSection = ({ title, items, activeItem, handleItemClick, themeMode }) => {
  return (
    <div className="mb-4">
      <h2
        className={`text-2xl mb-4 ${
          themeMode === "day" ? "text-[#8AB6D2]" : "text-gray-400"
        }`}
      >
        {title} -
      </h2>
      <ul className="space-y-4">
        {items.map((item) => (
          item.label && ( // Chỉ hiển thị nếu item.label tồn tại (bỏ qua các mục rỗng như Dashboard khi không phải admin)
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              isActive={activeItem === item.label}
              onClick={() => handleItemClick(item.label, item.link)}
              themeMode={themeMode}
            />
          )
        ))}
      </ul>
    </div>
  );
};

export default NavSection;