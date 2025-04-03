import React, { useState } from "react";
import "../styles/ChapterStyle.css"; // Import CSS styles
import Navibar from './Navibar.js';


// Placeholder images (thay thế bằng đường dẫn thực tế)
import logo from "../Assets/Logo.svg"; // Logo "Yuki"
import notificationIcon from "../Assets/notification.svg"; // Icon thông báo
import userIcon from "../Assets/user-icon.png"; // Icon người dùng
import messageIcon from "../Assets/message.svg"; // Icon message
import downloadIcon from "../Assets/download.svg"; // Icon download
import eyeicon from "../Assets/eye.svg"; // Icon download


export const Chapters = () => {
  const [activeTab, setActiveTab] = useState("Chapters"); // Mặc định tab "Chapters" đang hoạt động

  // Danh sách các chương
  const chapters = [
    { number: 1012 },
    { number: 1011 },
    { number: 1010 },
    { number: 1009 },
    { number: 1008 },
    { number: 1007 },
    { number: 1006 },
    { number: 1005 },
    { number: 1004 },
    { number: 1003 },
    { number: 1002 },
    { number: 1001 },
    { number: 1000 },
    { number: 999 },
  ];

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
          <Navibar />

          {/* Main Content */}
          <div className="rectangle-4">
            {/* Tabs */}
            <div className="tabs">
              <button
                className={activeTab === "Overview" ? "active" : ""}
                onClick={() => setActiveTab("Overview")}
              >
                Overview
              </button>
              <button
                className={activeTab === "Chapters" ? "active" : ""}
                onClick={() => setActiveTab("Chapters")}
              >
                Chapters
              </button>
              <button
                className={activeTab === "Recommendations" ? "active" : ""}
                onClick={() => setActiveTab("Recommendations")}
              >
                Recommendations
              </button>
            </div>

            {/* Nội dung của tab */}
            {activeTab === "Chapters" && (
              <div className="chapter-list">
                {chapters.map((chapter, index) => (
                  <div key={index} className="chapter-item">
                    <div className="chapter-number">
                      Chapter {chapter.number}
                    </div>
                    <div className="chapter-icons">
                      <img src={messageIcon} alt="Message" className="chapter-icon" />
                      <img src={downloadIcon} alt="Download" className="chapter-icon" />
                      <img src={eyeicon} alt="Download" className="chapter-icon" />

                    </div>
                  </div>
                ))}
              </div>
            )}
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