import React, { useState } from "react";
import Navibar from "../components/layout/Navbar";
import ChaptersModal from "./ChaptersModal";

const ChapterItem = () => {
  const [input1, onChangeInput1] = useState('');
  const [activeTab, setActiveTab] = useState("Overview");
  const [currentPage, setCurrentPage] = useState(1);
  const [showChaptersModal, setShowChaptersModal] = useState(false);
  const totalPages = 20;

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
    <div className="flex flex-col bg-white min-h-screen">
      <div className="flex flex-col">
        {/* Main Layout */}
        <div className="flex flex-row min-h-[calc(100vh-80px)]">
          {/* Sidebar */}
          <Navibar />

          {/* Main Content */}
          <div className="flex-1 relative">
            <div className="flex flex-col bg-[#1F1F1F] border-2 border-[#1F1F1F] py-4">
              <div className="flex flex-col items-center pb-4 mx-8">
                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-8">
                  <span
                    className={`text-white text-xl font-bold bg-[#1B6FA8] border border-[#1F1F1F] px-5 py-2 cursor-pointer rounded ${
                      activeTab === "Overview" ? "bg-white text-[#1F1F1F]" : ""
                    }`}
                    onClick={() => setActiveTab("Overview")}
                  >
                    Overview
                  </span>
                  <span
                    className={`text-white text-xl font-bold bg-[#1B6FA8] border border-[#1F1F1F] px-5 py-2 cursor-pointer rounded ${
                      activeTab === "Chapters" ? "bg-white text-[#1F1F1F]" : ""
                    }`}
                  >
                    Chapters
                  </span>
                  <div className="flex items-center">
                    <span
                      className={`text-white text-xl font-bold bg-[#1B6FA8] border border-[#1F1F1F] px-5 py-2 cursor-pointer rounded ${
                        activeTab === "Recommendations" ? "bg-white text-[#1F1F1F]" : ""
                      }`}
                      onClick={() => setActiveTab("Recommendations")}
                    >
                      Recommendations
                    </span>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-center gap-4 mt-8">
                  <span 
                    className="text-white text-xl font-bold bg-[#1B6FA8] border border-[#1F1F1F] px-5 py-2 cursor-pointer rounded"
                    onClick={handlePreviousPage}
                  >
                    Previous Chapter
                  </span>
                  <span 
                    className="text-white text-xl font-bold bg-[#1B6FA8] border border-[#1F1F1F] px-5 py-2 cursor-pointer rounded"
                    onClick={() => setShowChaptersModal(true)}
                  >
                    Chapter
                  </span>
                  <span 
                    className="text-white text-xl font-bold bg-[#1B6FA8] border border-[#1F1F1F] px-5 py-2 cursor-pointer rounded"
                    onClick={handleNextPage}
                  >
                    Next Chapter
                  </span>
                </div>

                {/* Modal Chapters */}
                {showChaptersModal && (
                  <ChaptersModal 
                    onClose={() => setShowChaptersModal(false)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterItem;