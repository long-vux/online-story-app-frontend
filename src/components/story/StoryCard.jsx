import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ dùng import thay vì require

const StoryCard = ({ story }) => {
  const ROOT_URL = process.env.REACT_APP_ROOT_URL;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/story-detail/${story._id}`);
    // reload
    window.location.reload();
  };
  
  return (
    <div className="bg-gray-700 p-3 rounded-lg shadow hover:shadow-md transition-shadow hover:bg-gray-600 cursor-pointer" onClick={handleClick} >
      <img
        src={`${ROOT_URL}/uploads/thumbnails/${story?.thumbnail}`}
        alt={story?.title}
        className="w-full h-48 object-cover rounded mb-2 border border-gray-600"
      />
      <p className="font-medium truncate text-white">{story?.title}</p>
      <p className="text-sm text-gray-400 truncate">{story?.author}</p>
      <p className="text-sm text-gray-500">Chapter: {story?.number_of_chapters}</p>
      <p className="text-sm text-yellow-400">★ Rating:  {story?.rating || 5}</p>
    </div>
  );
};

export default StoryCard;