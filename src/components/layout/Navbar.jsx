import React, { useState } from "react";
import NavSection from "./NavSection";

// Import các biểu tượng SVG hoặc PNG
import HomeIcon from "../../assets/HomeIcon.svg";
import DiscoverIcon from "../../assets/DiscoverIcon.svg";
import AuthorsIcon from "../../assets/AuthorsIcon.png";
import NotificationsIcon from "../../assets/NotificationsIcon.png";
import ProfileIcon from "../../assets/ProfileIcon.svg";
import MyListIcon from "../../assets/MyListIcon.png";
import SettingsIcon from "../../assets/SettingsIcon.png";
import DonateIcon from "../../assets/DonateIcon.png";

const menuItems = {
  Menu: [
    { label: "Home", icon: HomeIcon },
    { label: "Discover Comics", icon: DiscoverIcon },
    { label: "Authors", icon: AuthorsIcon },
    { label: "Notifications", icon: NotificationsIcon },
  ],
  General: [
    { label: "Profile", icon: ProfileIcon },
    { label: "My List", icon: MyListIcon },
    { label: "Settings", icon: SettingsIcon },
    { label: "Donate", icon: DonateIcon },
  ],
};

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("Discover Comics");

  return (
    <nav className="w-1/7 bg-[#1b6fa8] text-white p-6 pt-[80px] shadow-lg">
      {Object.entries(menuItems).map(([section, items]) => (
        <NavSection
          key={section}
          title={section}
          items={items}
          activeItem={activeItem}
          handleItemClick={setActiveItem}
        />
      ))}
    </nav>
  );
};

export default Navbar;
