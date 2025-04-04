import React, { useState } from "react";

const Rating = () => {
  const [hoveredStar, setHoveredStar] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);
  const [finalRating, setFinalRating] = useState(null);
  const [canAddRating, setCanAddRating] = useState(false);

  const handleMouseEnter = (index) => {
    if (!finalRating) setHoveredStar(index);
  };

  const handleMouseLeave = () => {
    if (!finalRating) setHoveredStar(null);
  };

  const handleClick = (index) => {
    setSelectedStar(index);
    setCanAddRating(true);
  };

  const handleAddRating = () => {
    setFinalRating(selectedStar);
    setCanAddRating(false);
  };

  return (
    <div className="bg-[#121212] p-6 rounded-lg shadow mt-[100px] text-white">
      <h2 className="text-2xl font-bold mb-4">Ratings</h2>

      <div className="flex items-center space-x-3">
        {[...Array(5)].map((_, idx) => {
          const starIndex = idx + 1;
          const isFilled =
            finalRating >= starIndex ||
            (!finalRating && (hoveredStar || selectedStar) >= starIndex);

          return (
            <span
              key={idx}
              className={`text-3xl cursor-pointer transition-colors duration-150 ${
                isFilled ? "text-yellow-400" : "text-gray-600"
              }`}
              onMouseEnter={() => handleMouseEnter(starIndex)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(starIndex)}
            >
              ★
            </span>
          );
        })}

        {finalRating ? (
          <span className="text-lg font-semibold">{finalRating} / 5</span>
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
