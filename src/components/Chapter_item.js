import React, { useState } from "react";
import "../styles/Chapter_item.css"; // Import CSS styles

// Placeholder images (thay thế bằng đường dẫn thực tế)
import logo from "../Assets/Logo.svg"; // Logo "Yuki"
import notificationIcon from "../Assets/notification.svg"; // Icon thông báo
import userIcon from "../Assets/user-icon.png"; // Icon người dùng
 // Icon eye (không sử dụng trong trang này)
import mangaPage from "../Assets/manga-page.jpg"; // Hình ảnh trang manga (thay thế bằng hình thực tế)
import Navibar from "./Navibar";

export const Chapter_item= ()  => {
  const [input1, onChangeInput1] = useState('');
  const [activeTab, setActiveTab] = useState("Chapters"); // Mặc định tab "Chapters" đang hoạt động
  const [currentPage, setCurrentPage] = useState(1); // Trạng thái để quản lý trang hiện tại
  const totalPages = 20; // Tổng số trang (có thể thay đổi)

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="contain">
      <div className="scroll-view">
        {/* Header */}
        <div className="row-view">
          <div className="row-view2">
            <img src={logo} className="logo" alt="Yuki Logo" />
          </div>
          <div className="box"></div>
          <div className="row-view3">
            <img src={notificationIcon} className="image" alt="Search Icon" />
            <input
              placeholder={"Search here"}
              value={input1}
              onChange={(event) => onChangeInput1(event.target.value)}
              className="input"
            />
            <img src={notificationIcon} className="image2" alt="Search Icon 2" />
          </div>
          <img src={notificationIcon} className="image3" alt="Notification Icon" />
          <div className="row-view4">
            <img src={userIcon} className="image4" alt="User Icon" />
            <div className="column">
              <span className="text3">{"Krowl Bell"}</span>
              <span className="text4">{"Verified"}</span>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="row-view5">
          {/* Sidebar */}
          <Navibar />

          {/* Main Content */}
          <div className="column4">
            <div className="column5">
              <div className="column6">
                {/* Tabs */}
                <div className="tabs">
                  <span
                    className={`text9 ${activeTab === "Overview" ? "active" : ""}`}
                    onClick={() => setActiveTab("Overview")}
                  >
                    {"Overview"}
                  </span>
                  <span
                    className={`text10 ${activeTab === "Chapters" ? "active" : ""}`}
                    onClick={() => setActiveTab("Chapters")}
                  >
                    {"Chapters"}
                  </span>
                  <div className="view2">
                    <span
                      className={`text11 ${activeTab === "Recommendations" ? "active" : ""}`}
                      onClick={() => setActiveTab("Recommendations")}
                    >
                      {"Recommendations"}
                    </span>
                  </div>
                </div>
                <button className="button">
                    <span className="text12">{`${currentPage}/${totalPages}`}</span>
                  </button>
                {/* Manga Page */}
                <img
                  src={mangaPage} // Thay thế bằng hình ảnh thực tế
                  className="image9"
                  alt="Manga Page"
                />

                {/* Navigation Buttons */}
                <div className="row-view11">
                  <span className="button" onClick={handlePreviousPage}>
                    {"Previous Chapter"}
                  </span>
                  <span className="button" onClick={handlePreviousPage}>
                    {"Chapter"}
                  </span>
                  <span className="button" onClick={handleNextPage}>
                    {"Next Chapter"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute-box"></div>
        <div className="absolute-view"></div>
      </div>
    </div>
  );
};