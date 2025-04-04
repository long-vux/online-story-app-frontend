import React from "react";

const MangaInfo = ({ title, author, stats, description, categories, readingStatus }) => {
  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold mb-2 text-white">{title}</h1>
      <p className="text-gray-400 mb-4">{author}</p>
      
      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-300">
        <span>{stats.volumes}; {stats.chapters}</span>
        <span>{stats.publisher}</span>
        <span>{stats.years}</span>
        <span className="font-medium text-yellow-400">
          {stats.rating} ★
        </span>
        <span>Rank {stats.rank}</span>
      </div>
      
      <p className="text-gray-300 mb-6 leading-relaxed">
        {description}
      </p>
      
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-white">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button 
              key={category} 
              className="px-3 py-1 bg-gray-700 rounded-full text-sm hover:bg-gray-600 text-gray-200"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-bold mb-2 text-white">My List</h3>
        <div className="flex flex-wrap gap-2">
          {readingStatus.map((status) => (
            <button 
              key={status} 
              className={`px-3 py-1 rounded-full text-sm ${
                status === "Reading" 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "bg-gray-700 hover:bg-gray-600 text-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MangaInfo;