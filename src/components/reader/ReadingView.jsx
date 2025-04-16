import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PageFlipStrategy, ScrollStrategy } from "./FlipScrollStrategies";

const ReadingView = ({ themeStrategy }) => {
  const [pages, setPages] = useState([]);
  const [readingMode, setReadingMode] = useState("page-flip"); // Chế độ đọc
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const API_URL = process.env.REACT_APP_API_URL;
  const { chapterId } = useParams();

  // Lấy danh sách trang từ API
  useEffect(() => {
    const fetchPagesByChapter = async () => {
      const apiUrl = API_URL + "chapter-image/" + chapterId;
      try {
        const response = await axios.get(apiUrl);
        setPages(response.data.images);
        console.log("fetch page", response.data.images);
      } catch (error) {
        console.error("Error fetching chapter detail:", error);
      }
    };
    fetchPagesByChapter();
  }, [chapterId, API_URL]);

  // Tạo instances của các chiến lược đọc
  const pageFlipStrategy = new PageFlipStrategy();
  const scrollStrategy = new ScrollStrategy();

  // Chọn chiến lược đọc
  const readingStrategy =
    readingMode === "page-flip" ? pageFlipStrategy : scrollStrategy;

  // Hàm chuyển đổi chế độ đọc
  const toggleReadingMode = () => {
    setReadingMode(readingMode === "page-flip" ? "scroll" : "page-flip");
    setCurrentPage(0); // Reset trang khi chuyển chế độ
  };

  return (
    <div className="max-w-[800px] mx-auto p-5">
      {/* Nút chuyển đổi chế độ đọc */}
      <div className="mb-4 flex justify-center space-x-4">
        <button
          onClick={toggleReadingMode}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Switch to {readingMode === "page-flip" ? "Scroll" : "Page Flip"} Mode
        </button>
      </div>

      {/* Nội dung chính */}
      <div className="pages">
        {readingStrategy.renderContent(
          pages,
          currentPage,
          themeStrategy.getContentClasses()
        )}
      </div>

      {/* Nút điều hướng (chỉ hiển thị cho Page Flip) */}
      {readingMode === "page-flip" && (
        <div className="mt-5 flex justify-between">
          <button
            onClick={() =>
              readingStrategy.handleNavigation(
                "prev",
                setCurrentPage,
                pages.length
              )
            }
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() =>
              readingStrategy.handleNavigation(
                "next",
                setCurrentPage,
                pages.length
              )
            }
            disabled={currentPage === pages.length - 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === pages.length - 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ReadingView;