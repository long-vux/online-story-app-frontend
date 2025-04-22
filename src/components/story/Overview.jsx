import { React, useState, useEffect } from 'react';
import Comment from "./Comment";
import Rating from "./Rating";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"; // Sửa import để không dùng require
import {jwtDecode} from "jwt-decode";

const Overview = ({ story: initialStory, setActiveTab }) => {
    const ROOT_URL = process.env.REACT_APP_ROOT_URL;
    const API_URL = process.env.REACT_APP_API_URL;
    const [story, setStory] = useState(initialStory);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(null); // Store the progress object
    const navigate = useNavigate(); // Đảm bảo useNavigate được sử dụng trong ngữ cảnh <Router>
    const token = JSON.parse(localStorage.getItem("user"));
    const userId = jwtDecode(token).userId;

console.log('story',story);
    useEffect(() => {
        const checkSubscriptionStatus = async () => {
            try {
                const response = await axios.get(`${API_URL}user/${story._id}/isSubscribed`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIsSubscribed(response.data.isSubscribed); // Cập nhật trạng thái subscribe
            } catch (error) {
                console.error("Error checking subscription status:", error);
            }
        };

        checkSubscriptionStatus();
    }, [story._id, token]);  // Đảm bảo kiểm tra lại khi `story` thay đổi


    // fetch progress chapter
    useEffect(() => {
        const fetchProgress = async () => {
            const apiUrl = `${API_URL}progress/${userId}/${story._id}`;
            console.log("Fetching progress from:", apiUrl);
            try {
                const response = await axios.get(apiUrl, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProgress(response.data.progress); // Store the entire progress object
            } catch (error) {
                console.error("Error fetching progress:", error);
            }
        };
        fetchProgress();
    }, [userId, story._id, token]);


    const toggleSubscribe = async () => {
        setIsLoading(true);
        try {
            if (isSubscribed) {
                // Hủy subscribe
                await axios.delete(`${API_URL}stories/${story._id}/unsubscribe`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                // Thêm subscriber
                await axios.post(`${API_URL}stories/${story._id}/subscribe`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            setIsSubscribed(!isSubscribed); // Toggle state
            toast.success(isSubscribed ? 'Đã hủy theo dõi truyện!' : 'Đã theo dõi truyện!');
        } catch (error) {
            console.error("Subscription error:", error);
            toast.error("Thao tác thất bại!");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleReading = () => {
        if (progress?.chapterId) {
            navigate(`/reading-view/${progress.chapterId._id}`); // Use the chapterId's _id for navigation
        } else {
            setActiveTab("Chapters");
        }
    };

    const handleAddRating = async (rating) => {
        try {
            const response = await axios.post(
                `${API_URL}stories/${story._id}/rate`,
                { rating },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const updatedStory = response.data.story || {
                ...story,
                ratings: [...story.ratings, { userId: { _id: userId }, rating }],
            };
            setStory(updatedStory);
            return true;
        } catch (error) {
            console.error("Error adding rating:", error);
            return false;
        }
    };

    return (
        <>
            <div className="grid md:grid-cols-2 my-10">
                {/* Left: Image */}
                <div className="flex flex-col items-center relative">
                    <img
                        src={`${ROOT_URL}/uploads/thumbnails/${story.thumbnail}`}
                        alt={story.title}
                        className="w-[350px] object-cover rounded-lg shadow-md"
                    />
                    <button
                        onClick={toggleSubscribe}
                        disabled={isLoading}
                        className={`mt-4 flex items-center justify-center w-[350px] py-2 px-4 rounded-full font-medium transition
                            ${isSubscribed
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-gray-700 hover:bg-gray-600 text-orange-400 border border-orange-400'}
                        `}
                    >
                        {isLoading ? (
                            <span>Loading...</span>
                        ) : (
                            <>
                                {isSubscribed ? (
                                    <>
                                        <span className="mr-2">❤️</span> Đã theo dõi
                                    </>
                                ) : (
                                    <>
                                        <span className="mr-2">🤍</span> Theo dõi truyện
                                    </>
                                )}
                            </>
                        )}
                    </button>
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
                        <span className="font-semibold">Your progress chapter:</span> {progress?.chapterId?.chapter_number || "Not started"}
                    </div>
                    <button
                        className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition"
                        onClick={handleReading}
                    >
                        {progress?.chapterId ? "Continue Reading" : "Start Reading"}
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