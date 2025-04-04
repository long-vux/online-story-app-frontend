import { React, useState } from 'react';
import onePieceCover from "../../assets/one-piece-cover.jpg";
import Comment from "./Comment";
import Rating from "./Rating";

const Overview = () => {
    return (
        <>
            <div className="grid md:grid-cols-2 my-10 ">
                {/* Left: Image */}
                <div className="flex flex-col items-center">
                    <img
                        src={onePieceCover}
                        alt="One Piece Cover"
                        className="w-[350px] object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Right: Info */}
                <div className=''>
                    <h1 className="text-4xl font-bold mb-2 text-orange-400">
                        One Piece
                    </h1>
                    <p className="text-gray-400 mb-2">
                        By Eiichiro Oda 
                    </p>
                    
                    <p className="text-gray-300 mb-4 mr-8 leading-relaxed">
                        Long ago the infamous Gol D. Roger was the strongest and most
                        powerful pirate on the seas. As he was about to be executed he
                        revealed that he hid all of his wealth, including the
                        legendary treasure known as One Piece, on an island at the end
                        of the Grand Line. Luffy, a spirited and energetic young man,
                        sets out to find this treasure and become the Pirate King!
                    </p>
                    <p className={"mb-3"}>
                        <span className={`text-2xl text-yellow-400 mr-2` }>
                        ★
                        </span> 
                        4.8 |  
                        <span className={`text-gray-400`}> 125 ratings</span>
                        
                    </p>
                    <div className="mb-3">
                        <span className="font-semibold">Category:</span>{" "}
                        <span className="text-orange-400">Action</span>
                    </div>
                    <div className="mb-3">
                        <span className="font-semibold">Latest Chapter:</span> 12
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