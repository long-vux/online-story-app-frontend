import { React, useState } from 'react';
import onePieceCover from "../../assets/one-piece-cover.jpg";
import Comment from "./Comment";
import Rating from "./Rating";

const Overview = ({ story }) => {
    const ROOT_URL = process.env.REACT_APP_ROOT_URL;
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
                        {story.rating || 5} |
                        <span className={`text-gray-400`}> {story.numberOfRating || 100} ratings</span>

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
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition">
                        Continue Reading
                    </button>
                </div>
            </div>

            {/* rating section */}
            <Rating />

            {/* comment section */}
            <Comment />
        </>
    );
};

export default Overview;