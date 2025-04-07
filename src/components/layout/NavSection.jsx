import React from "react";
import NavItem from "./NavItem";

const NavSection = ({ title, items, activeItem, handleItemClick }) => {
  return (
    <div className="mb-4">
      <h2 className="text-[#8AB6D2] text-2xl mb-4">{title} -</h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.label}
            onClick={() => handleItemClick(item.label, item.link)}
          />
        ))}
      </ul>
    </div>
  );
};

export default NavSection;
