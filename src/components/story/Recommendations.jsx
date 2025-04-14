import React, { useEffect, useState } from "react";
import StoryCard from "./StoryCard";
import axios from "axios";

const Recommendations = ({genre}) => {

  const ROOT_URL = process.env.REACT_APP_ROOT_URL;
  const API_URL = process.env.REACT_APP_API_URL;
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStoriesFromGenre = async () => {
      try {
        const response = await axios.get(API_URL + 'genres/' + genre + '/stories');
        setStories(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchStoriesFromGenre();
  }, []);

  return (
    <div>
      <p className="text-xl font-semibold mb-4 text-white">
        If you like this manga, you might like
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stories.map((story, index) => (
          <StoryCard key={index} story={story} />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;