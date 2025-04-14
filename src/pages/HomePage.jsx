import React, { useEffect, useState } from "react";
import StoryCard from "../components/story/StoryCard";
import axios from "axios";
import { toast } from "react-toastify";

const categories = [
  "Action", 
  "Romance",
  "Detective",
  "Horror"
];

const API_URL = process.env.REACT_APP_API_URL;

const HomePage = () => {
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(null);

  const fetchStories = async () => {
    try {
      const res = await axios.get(`${API_URL}stories`);
      if (res.status === 200) {
        setStories(res.data);
      }
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);



  return (
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
          <h2 className="text-xl font-semibold mb-4 text-pink-400">Categories</h2>
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
          <h2 className="text-xl font-semibold mb-4">Popular this month</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stories.map((story, idx) => (
              <StoryCard key={idx} story={story} />
            ))}
          </div>
        </section>

        {/* Recent Uploads */}
        <section>
          <h2 className="text-xl font-semibold mb-4">🆕 Recent Uploads</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stories
              .slice()
              .reverse()
              .map((story, idx) => (
                <StoryCard key={idx} story={story} />
              ))}
          </div>
        </section>
      </div>
  );
};

export default HomePage;
