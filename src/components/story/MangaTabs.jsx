import React from "react";

const MangaTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-gray-700 mb-6">

      {/* Overview */}
      <button 
        className={`px-4 py-2 text-xl ${
          activeTab === "Overview" 
            ? "text-blue-400 border-b-2 border-blue-400" 
            : "text-gray-400 hover:text-gray-300"
        }`}
        onClick={() => setActiveTab("Overview")}
      >
        Overview
      </button>

      {/* Chapters */}
      <button 
        className={`px-4 py-2 text-xl ${
          activeTab === "Chapters" 
            ? "text-blue-400 border-b-2 border-blue-400" 
            : "text-gray-400 hover:text-gray-300"
        }`}
        onClick={() => setActiveTab("Chapters")}
      >
        Chapters
      </button>

      {/* Recommendations */}
      <button 
        className={`px-4 py-2 text-xl ${
          activeTab === "Recommendations" 
            ? "text-blue-400 border-b-2 border-blue-400" 
            : "text-gray-400 hover:text-gray-300"
        }`}
        onClick={() => setActiveTab("Recommendations")}
      >
        Recommendations
      </button>
    </div>
  );
};

export default MangaTabs;