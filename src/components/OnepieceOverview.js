import React, { useState } from "react";

import "../styles/OnepieceOverview.css"; // Import CSS styles
import Navibar from './Navibar.js';

// Placeholder images (thay thế bằng đường dẫn thực tế)
import logo from "../Assets/Logo.svg"; // Logo "Yuki"
import notificationIcon from "../Assets/notification.svg"; // Icon thông báo
import userIcon from "../Assets/user-icon.png"; // Icon người dùng
import heartIcon from "../Assets/Heart.svg"; // Icon trái tim
import starIcon from "../Assets/Star.svg"; // Icon sao
import onePieceCover from "../Assets/one-piece-cover.jpg"; // Bìa manga One Piece
import soloLevelingCover from "../Assets/solo-leveling.jpg"; // Bìa manga Solo Leveling
import versatileMageCover from "../Assets/versatile-mage.jpg"; // Bìa manga Versatile Mage
import berserkCover from "../Assets/berserk.jpg"; // Bìa manga Berserk
import beginningAfterEndCover from "../Assets/beginning-after-end.jpg"; // Bìa manga The Beginning After the End

export const OnepieceOverview = () => {
  const [activeTab, setActiveTab] = useState("Overview"); // Mặc định tab "Overview" đang hoạt động 
  const [likeValue, setLikeValue] = useState(0); // Trạng thái để quản lý giá trị thanh trượt
  return (
    <div className="onepiece-overview">
      <div className="div-2">
        {/* Header */}
        <div className="overlap-26">
          <div className="logo-instance">
            <img src={logo} alt="Yuki Logo" />
          </div>
          <div className="group-39-instance">
            <input type="text" placeholder="Search here" />
          </div>
          <div className="user-section">
            <div className="group-135">
              <img src={notificationIcon} alt="Notifications" />
              <span className="notification-count">2</span>
            </div>
            <div className="user-icon2">
              <img src={userIcon} alt="User" />
              <span className="user-name">Krowl Bell</span>
              <span className="verified">Verified</span>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="overlap-25">
          {/* Sidebar */}
          <Navibar/>

          {/* Main Content */}
          <div className="rectangle-4">
            {/* Tabs */}
            <div className="tabs">
              <button className={activeTab === "Overview" ? "active" : ""} onClick={() => setActiveTab("Overview")}>
                Overview
              </button>
              <button className={activeTab === "Chapters" ? "active" : ""} onClick={() => setActiveTab("Chapters")}>
                Chapters
              </button>
              <button className={activeTab === "Recommendations" ? "active" : ""} onClick={() => setActiveTab("Recommendations")}>
                Recommendations
              </button>
            </div>

            {/* Manga Overview */}
            <div className="manga-overview">
              <div className="manga-cover-section">
                <img src={onePieceCover} alt="One Piece Cover" className="manga-cover" />
                <div className="likes">
                  <img src={heartIcon} alt="Heart" />
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={likeValue}
                    onChange={(e) => setLikeValue(e.target.value)}
                    className="like-slider"
                  />
                  <span>{likeValue}</span> {/* Hiển thị giá trị hiện tại */}
                </div>
              </div>
              <div className="manga-details">
                <h1>One Piece</h1>
                <p className="author">Eiichiro Oda</p>
                <div className="stats">
                  <span>Vol 104+; Ch 1069+</span>
                  <span>Weekly Shonen Jump</span>
                  <span>1997 - ?</span>
                  <div className="group-133">
                    <span className="text-wrapper-45">9.32</span>
                    <img src={starIcon} alt="Star" className="vector-4" />
                  </div>
                  <span>Rank #3</span>
                </div>
                <p className="description">
                  Long ago the infamous Gol D. Roger was the strongest and most powerful pirate on the seas. As he was about to be executed he revealed that he hid all of his wealth, including the legendary treasure known as One Piece, on an island at the end of the Grand Line - a treacherous and truly unpredictable sea. Monkey D. Luffy is a spirited, energetic and somewhat dim-witted young man with a very big dream: to find One Piece and become the Pirate King! However Luffy is no ordinary boy, as when he was younger he ate one of the Devil's Fruits and gained its power to become a Rubber Man. Now in this grand age of pirates Luffy sets out to gather a crew and sail to the most dangerous sea in the world so that he can fulfill his dream... and maybe even his appetite!
                </p>
                <div className="categories">
                  <h3>Category</h3>
                  <div className="category-buttons">
                    <button>Action</button>
                    <button>Adventure</button>
                    <button>Comedy</button>
                    <button>Fantasy</button>
                    <button>Shounen</button>
                    <button>Pirates</button>
                    <button>SuperPowers</button>
                    <button>Adapted to anime</button>
                  </div>
                </div>
                <div className="reading-status">
                  <h3>My List</h3>
                  <div className="status-buttons">
                    <button className="active">Reading</button>
                    <button>Want to read</button>
                    <button>Stalled</button>
                    <button>Dropped</button>
                    <button>Won't read</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="group-132">
              <p className="text-wrapper-44">If you like this manga, you might like</p>
            </div>
            <div className="recommendations">
              <div className="recommendation-item">
                <img src={onePieceCover} alt="One Piece" />
                <p>One Piece</p>
                <p>Eiichiro Oda</p>
                <p>Chapter 1033</p>
                <p>★ 9.36</p>
              </div>
              <div className="recommendation-item">
                <img src={soloLevelingCover} alt="Solo Leveling" />
                <p>Solo Leveling</p>
                <p>Jung Rok</p>
                <p>Chapter 124</p>
                <p>★ 9.15</p>
              </div>
              <div className="recommendation-item">
                <img src={versatileMageCover} alt="Versatile Mage" />
                <p>Versatile Mage</p>
                <p>Chaos</p>
                <p>Chapter 155</p>
                <p>★ 9.78</p>
              </div>
              <div className="recommendation-item">
                <img src={berserkCover} alt="Berserk" />
                <p>Berserk</p>
                <p>Kentaro Miura</p>
                <p>Chapter 360</p>
                <p>★ 9.22</p>
              </div>
              <div className="recommendation-item">
                <img src={beginningAfterEndCover} alt="The Beginning After the End" />
                <p>The Beginning After the End</p>
                <p>TurtleMe</p>
                <p>Chapter 122</p>
                <p>★ 9.05</p>
              </div>
            </div>
          </div>

          {/* Decorative Rectangles */}
          <div className="rectangle-5" />
          <div className="rectangle-6" />
          <div className="rectangle-8" />
        </div>
      </div>
    </div>
  );
};