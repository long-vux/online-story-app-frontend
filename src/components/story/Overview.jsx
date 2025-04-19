import { React, useState } from 'react';
import Comment from "./Comment";
import Rating from "./Rating";
import axios from "axios";
const { jwtDecode } = require("jwt-decode");

// Overview component to display story details and rating for
const Overview = ({ story: initialStory, setActiveTab }) => {
    const ROOT_URL = process.env.REACT_APP_ROOT_URL;
    const API_URL = process.env.REACT_APP_API_URL;
    const [story, setStory] = useState(initialStory); // dùng state để update UI


    const token = JSON.parse(localStorage.getItem("user"));
    const userId = jwtDecode(token).userId;

    const handleReading = () => {
        setActiveTab("Chapters");
    };

    const handleAddRating = async (rating) => {
        try {
            const response = await axios.post(
                `${API_URL}stories/${story._id}/rate`,
                { rating },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Giả sử API trả về story mới (cập nhật average + ratings array)
            const updatedStory = response.data.story || {
                ...story,
                ratings: [...story.ratings, { userId: { _id: userId }, rating }],
            };

            setStory(updatedStory); // cập nhật lại để UI render lại

            return true; // báo cho child biết thành công
        } catch (error) {
            console.error("Error adding rating:", error);
            return false;
        }
    };



    return (
        <>
            <div className="grid md:grid-cols-2 my-10 ">
                {/* Left: Image */}
                <div className="flex flex-col items-center">
                    <img
                        src={`${ROOT_URL}/uploads/thumbnails/${story.thumbnail}`}
                        alt={story.title}
                        className="w-[350px] object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Right: Info */}
                <div className=''>
                    <h1 className="text-4xl font-bold mb-2 text-orange-400">
                        {story.title}
                    </h1>
                    <p className="text-gray-400 mb-2">
                        By {story.author}
                    </p>

                    <p className="text-gray-300 mb-4 mr-8 leading-relaxed">
                        {story.description}
                    </p>
                    <p className={"mb-3"}>
                        <span className={`text-2xl text-yellow-400 mr-2`}>
                            ★
                        </span>
                        {story.averageRating || 5} |&nbsp;
                        <span className={`text-gray-400`}>
                            {story.ratings.length} {story.ratings.length < 2 ? 'rating' : 'ratings'}
                        </span>

                    </p>
                    <div className="mb-3">
                        <span className="font-semibold">Genre:</span>{" "}
                        <span className="text-orange-400">{story.genre}</span>
                    </div>
                    <div className="mb-3">
                        <span className="font-semibold">Latest Chapter: {story.latest_chapter}</span>
                    </div>
                    <div className="mb-6">
                        <span className="font-semibold">Your progress chapter:</span> 10
                    </div>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition" onClick={handleReading}>
                        Continue Reading
                    </button>
                </div>
            </div>

            {/* rating section */}
            <Rating story={story} currentUserId={userId} callBackAddRating={handleAddRating} />

            {/* comment section */}
            <Comment story={story} currentUserId={userId} />
        </>
    );
};

export default Overview;