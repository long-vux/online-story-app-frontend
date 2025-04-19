import React, { useState } from "react";
import { toast } from 'react-toastify';
const Rating = ({ story, currentUserId, callBackAddRating }) => {
  const [hoveredStar, setHoveredStar] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);
  const [canAddRating, setCanAddRating] = useState(false);

  // Kiểm tra xem người dùng đã đánh giá chưa
  const hasRated = story.ratings.some(
    (rating) => rating.userId._id === currentUserId
  );

  // Tìm rating của người dùng hiện tại
  const userRating = story.ratings.find(
    (rating) => rating.userId._id === currentUserId
  )?.rating;

  const handleMouseEnter = (index) => {
    if (!hasRated) {
      setHoveredStar(index);
    }
  };

  const handleMouseLeave = () => {
    if (!hasRated) {
      setHoveredStar(null);
    }
  };

  const handleClick = (index) => {
    if (!hasRated) {
      setSelectedStar(index);
      setCanAddRating(true);
    }
  };

  const handleAddRating = async () => {
    if (!hasRated && selectedStar) {
      try {
        const success = await callBackAddRating(selectedStar); // Gửi lên server
        if (success) {
          toast.success("Rating added successfully");
          setCanAddRating(false);
          setSelectedStar(null);
          // Có thể update trực tiếp UI hoặc gọi hàm fetch lại story từ props cha
        }
      } catch (err) {
        toast.error("Failed to add rating");
      }
    }
  };


  return (
    <div className="bg-[#121212] p-6 rounded-lg shadow mt-[100px] text-white">
      <h2 className="text-2xl font-bold mb-4">Ratings</h2>

      <div className="flex items-center space-x-3">
        {[...Array(5)].map((_, idx) => {
          const starIndex = idx + 1;
          const isFilled =
            (hasRated && userRating >= starIndex) ||
            (!hasRated && (hoveredStar || selectedStar) >= starIndex);

          return (
            <span
              key={idx}
              className={`text-3xl transition-colors duration-150 ${isFilled ? "text-yellow-400" : "text-gray-600"
                } ${hasRated ? "cursor-not-allowed" : "cursor-pointer"}`}
              onMouseEnter={() => handleMouseEnter(starIndex)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(starIndex)}
            >
              ★
            </span>
          );
        })}

        {hasRated ? (
          <span className="text-lg font-semibold ml-2">
            Your rating: {userRating} / 5
          </span>
        ) : canAddRating ? (
          <button
            onClick={handleAddRating}
            className="ml-3 bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded-lg font-medium transition"
          >
            Add Your Rating
          </button>
        ) : (
          <span className="text-gray-400 text-sm ml-2">No rating</span>
        )}
      </div>
    </div>
  );
};

export default Rating;