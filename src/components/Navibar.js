import React, { useState } from 'react';
import '../styles/Navibar.css'; // Import file CSS để định kiểu

// Import các biểu tượng SVG (giả định bạn đã có sẵn)
import HomeIcon from '../Assets/HomeIcon.svg';
import DiscoverIcon from '../Assets/DiscoverIcon.svg';
import AuthorsIcon from '../Assets/AuthorsIcon.png';
import NotificationsIcon from '../Assets/NotificationsIcon.png';
import ProfileIcon from '../Assets/ProfileIcon.svg';
import MyListIcon from '../Assets/MyListIcon.png';
import SettingsIcon from '../Assets/SettingsIcon.png';
import DonateIcon from '../Assets/DonateIcon.png';

const Navibar = () => {
  const [activeItem, setActiveItem] = useState('Discover Comics');

  const handleItemClick = (item) => {
    setActiveItem(item);
    // Có thể thêm logic điều hướng ở đây nếu cần
  };

  return (
    <nav className="navibar">
      <div className="menu-section">
        <h2>Menu -</h2>
        <ul>
          <li className={activeItem === 'Home' ? 'active' : ''} onClick={() => handleItemClick('Home')}>
            <img src={HomeIcon} alt="Home" className="icon" /> Home
          </li>
          <li className={activeItem === 'Discover Comics' ? 'active' : ''} onClick={() => handleItemClick('Discover Comics')}>
            <img src={DiscoverIcon} alt="Discover Comics" className="icon" /> Discover Comics
          </li>
          <li className={activeItem === 'Authors' ? 'active' : ''} onClick={() => handleItemClick('Authors')}>
            <img src={AuthorsIcon} alt="Authors" className="icon" /> Authors
          </li>
          <li className={activeItem === 'Notifications' ? 'active' : ''} onClick={() => handleItemClick('Notifications')}>
            <img src={NotificationsIcon} alt="Notifications" className="icon" /> Notifications
          </li>
        </ul>
      </div>
      <div className="general-section">
        <h2>General -</h2>
        <ul>
          <li className={activeItem === 'Profile' ? 'active' : ''} onClick={() => handleItemClick('Profile')}>
            <img src={ProfileIcon} alt="Profile" className="icon" /> Profile
          </li>
          <li className={activeItem === 'My List' ? 'active' : ''} onClick={() => handleItemClick('My List')}>
            <img src={MyListIcon} alt="My List" className="icon" /> My List
          </li>
          <li className={activeItem === 'Settings' ? 'active' : ''} onClick={() => handleItemClick('Settings')}>
            <img src={SettingsIcon} alt="Settings" className="icon" /> Settings
          </li>
          <li className={activeItem === 'Donate' ? 'active' : ''} onClick={() => handleItemClick('Donate')}>
            <img src={DonateIcon} alt="Donate" className="icon" /> Donate
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navibar;