import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PageFlipStrategy, ScrollStrategy } from "./ConcreteStrategy";

const ReadingView = () => {
  const [pages, setPages] = useState([]);
  const [readingMode, setReadingMode] = useState("page-flip"); // Chế độ đọc
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại (dùng cho page-flip)
  const API_URL = process.env.REACT_APP_API_URL;

  // Lấy danh sách trang từ API
  const {chapterId } = useParams();
  useEffect(() => {
    const fetchPagesByChapter = async () => {
      const apiUrl = API_URL +'chapter-image/' + chapterId;
      try {
        const response = await axios.get(apiUrl);
        setPages(response.data.images);
        console.log('fetch page',response.data.images);
      } catch (error) {
        console.error("Error fetching chapter detail:", error);
      }
    }; 
    fetchPagesByChapter(); 
  }, [chapterId])

  // Create instances of the strategies
  const pageFlipStrategy = new PageFlipStrategy();
  const scrollStrategy = new ScrollStrategy();

  // Chọn chiến lược dựa trên chế độ đọc
  const strategy = readingMode === "page-flip" ? pageFlipStrategy : scrollStrategy;

  // Hàm chuyển đổi chế độ đọc
  const toggleReadingMode = () => {
    setReadingMode(readingMode === "page-flip" ? "scroll" : "page-flip");
  };

  return (
    <div className="max-w-[800px] mx-auto p-5">
      {/* Nút chuyển đổi chế độ */}
      <button onClick={toggleReadingMode}>
        Switch to {readingMode === "page-flip" ? "Scroll" : "Page Flip"} Mode
      </button>

      {/* Hiển thị nội dung theo chiến lược */}
      <div className="pages">
        {strategy.renderContent(pages, currentPage)}
      </div>

      {/* Nút điều hướng (chỉ hiển thị cho Page Flip) */}
      {readingMode === "page-flip" && (
        <div className="mt-5">
          <button
            onClick={() => strategy.handleNavigation("prev", setCurrentPage, pages.length)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button
            onClick={() => strategy.handleNavigation("next", setCurrentPage, pages.length)}
            disabled={currentPage === pages.length - 1}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ReadingView;