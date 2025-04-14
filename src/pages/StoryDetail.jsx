import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MangaTabs from "../components/story/MangaTabs";
import Overview from "../components/story/Overview";
import Chapters from "../components/story/Chapters";
import Recommendations from "../components/story/Recommendations";
import axios from "axios";

const StoryDetail = () => {
  const { storyId } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");
  const [story, setStory] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchStoryDetail = async () => {
      const apiUrl = API_URL + 'stories/' + storyId;
      try {
        const response = await axios.get(apiUrl);
        setStory(response.data);
      } catch (error) {
        console.error("Error fetching story details:", error);
      }
    };

    fetchStoryDetail();
  }, [storyId]);

  if (!story) {
    return <div className="text-center mt-10 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <div className="flex">
        <div className="flex-1 p-6 m-4 rounded-xl shadow-lg bg-[#1a1a1a]">
          <MangaTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Hiển thị nội dung theo tab */}
          {activeTab === "Overview" && <Overview story={story} />}
          {activeTab === "Chapters" && (
            <div className="flex justify-center items-center">
              <Chapters storyId={story._id} />
            </div>
          )}
          {activeTab === "Recommendations" && (
            <Recommendations genre={story.genre} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
