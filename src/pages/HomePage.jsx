import React from "react";
import Navbar from "../components/layout/Navbar";
import StoryCard from "../components/story/StoryCard";

const mockMangas = [
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

const categories = [
  "All category", "Shonen", "Shojo", "Seinen", "Josei", "Kodomomuke",
  "One Shot", "Action", "Adventure", "Fantasy", "Dark Fantasy", 
  "Ecchi", "Romance", "Horror", "Parody", "Mistery"
];


const HomePage = () => {
  return (
    <div className="flex min-h-screen">
      <Navbar />

      <div className="flex-1 bg-gray-900 text-white p-6">
        {/* Out now */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Out now 🎉</h2>
          <img 
            src={require("../assets/profile.jpg")} 
            alt="One Piece Banner" 
            className="rounded-lg shadow-lg w-full h-60 object-cover"
          />
        </section>

        {/* Hot Categories */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-pink-400">🔥 Hot Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, idx) => (
              <button
                key={idx}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-4 py-1 rounded-full text-sm transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Popular this month */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">🔥 Popular this month</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockMangas.map((manga, idx) => (
              <StoryCard key={idx} manga={manga} />
            ))}
          </div>
        </section>

        {/* Recent Uploads */}
        <section>
          <h2 className="text-xl font-semibold mb-4">🆕 Recent Uploads</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockMangas
              .slice()
              .reverse()
              .map((manga, idx) => (
                <StoryCard key={idx} manga={manga} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
