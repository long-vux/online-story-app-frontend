import React from "react";
import StoryCard from "./StoryCard";

const Recommendations = () => {
  const recommendedManga = [
    { 
      img: "one-piece-cover.jpg", 
      title: "One Piece", 
      author: "Eiichiro Oda", 
      chapter: "Chapter 1033", 
      rating: "9.36" 
    },
    { 
      img: "solo-leveling.jpg", 
      title: "Solo Leveling", 
      author: "Jung Rok", 
      chapter: "Chapter 124", 
      rating: "9.15" 
    },
    { 
      img: "versatile-mage.jpg", 
      title: "Versatile Mage", 
      author: "Chaos", 
      chapter: "Chapter 155", 
      rating: "9.78" 
    },
    { 
      img: "berserk.jpg", 
      title: "Berserk", 
      author: "Kentaro Miura", 
      chapter: "Chapter 360", 
      rating: "9.22" 
    },
    { 
      img: "beginning-after-end.jpg", 
      title: "The Beginning After the End", 
      author: "TurtleMe", 
      chapter: "Chapter 122", 
      rating: "9.05" 
    }
  ];

  return (
    <div>
      <p className="text-xl font-semibold mb-4 text-white">
        If you like this manga, you might like
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {recommendedManga.map((manga, index) => (
          <StoryCard key={index} manga={manga} />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;