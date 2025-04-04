import React from "react";
import heartIcon from "../../assets/Heart.svg";

const MangaCover = ({ image, likeValue, setLikeValue }) => {
  return (
    <div className="flex flex-col items-center">
      <img 
        src={require(`../../assets/${image}`)} 
        alt="Manga Cover" 
        className="w-64 h-96 object-cover rounded-lg shadow-md border border-gray-700"
      />
      <div className="flex items-center mt-4 space-x-2">
        <img src={heartIcon} alt="Heart" className="h-6" />
        <input
          type="range"
          min="0"
          max="10"
          value={likeValue}
          onChange={(e) => setLikeValue(e.target.value)}
          className="w-24 accent-pink-500"
        />
        <span className="font-medium">{likeValue}</span>
      </div>
    </div>
  );
};

export default MangaCover;