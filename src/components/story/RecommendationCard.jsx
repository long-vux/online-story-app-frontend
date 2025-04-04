import React from "react";

const RecommendationCard = ({ manga }) => {
  return (
    <div className="bg-gray-700 p-3 rounded-lg shadow hover:shadow-md transition-shadow hover:bg-gray-600">
      <img 
        src={require(`../../assets/${manga.img}`)} 
        alt={manga.title} 
        className="w-full h-48 object-cover rounded mb-2 border border-gray-600"
      />
      <p className="font-medium truncate text-white">{manga.title}</p>
      <p className="text-sm text-gray-400 truncate">{manga.author}</p>
      <p className="text-sm text-gray-500">{manga.chapter}</p>
      <p className="text-sm text-yellow-400">★ {manga.rating}</p>
    </div>
  );
};

export default RecommendationCard;