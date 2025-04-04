import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import MangaTabs from "../components/story/MangaTabs";
import Overview from "../components/story/Overview";
import Chapters from "../components/story/Chapters";
import Recommendations from "../components/story/Recommendations";
const StoryDetail = () => {
  const [activeTab, setActiveTab] = useState("Overview");


  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <div className="flex">

        <Navbar />
        <div className="flex-1 p-6 m-4 rounded-xl shadow-lg bg-[#1a1a1a]">

          <MangaTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            navigator={navigator}
          />

          {/* Content based on active tab */}
          {activeTab === "Overview" && <Overview />}
          {activeTab === "Chapters" && (<div className="flex justify-center items-center "> <Chapters /> </div>)}
          {activeTab === "Recommendations" && <Recommendations />}

        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
