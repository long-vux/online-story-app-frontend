import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import messageIcon from "../../assets/message.svg";
import downloadIcon from "../../assets/download.svg";
import eyeicon from "../../assets/eye.svg";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ChaptersPage = ({storyId}) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [chapters, setChapters] = useState([]);
    

    const API_URL = process.env.REACT_APP_API_URL;
    const token = JSON.parse(localStorage.getItem("user"));
    const userId = jwtDecode(token).userId;


    useEffect(() => {
        const fetchChapters = async () => {
            const apiUrl = API_URL + 'stories/' + storyId + '/chapters';
            try {
                const response = await axios.get(apiUrl);
                setChapters(response.data);  
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching story detail:', error);
            }
        } 
        fetchChapters();
    }, [])

    const handleOpenPage = async (chapterId) => {
        // gọi API update progress (chapter đã đọc)
        const apiUrl = `${API_URL}progress`;
        try {
            const response = await axios.post(apiUrl, {
                userId: userId,
                storyId: storyId,
                chapterId: chapterId,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('response.data',response.data);
            // Chuyển hướng đến trang đọc
            navigate(`/reading-view/${chapterId}`);
        } catch (error) {
            console.error('Error fetching story detail:', error);
        }
        // chuyển sang trang mới
            
    }

    const totalPages = Math.ceil(chapters.length / 10);

    const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    return (
        <div className="flex w-[70%] mt-4">
            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-800  rounded-lg shadow-lg">
                {/* Chapters Table */}
                <div className="overflow-x-auto text-md">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-4 text-left font-bold text-gray-300 uppercase tracking-wider">Chapter</th>
                                <th className="px-6 py-4 text-left font-bold text-gray-300 uppercase tracking-wider">Date Update</th>
                                <th className="px-6 py-4 text-left font-bold text-gray-300 uppercase tracking-wider">Views</th>
                                <th className="px-6 py-4 text-left font-bold text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                            {chapters.slice((currentPage - 1) * 10, currentPage * 10).map((chapter, index) => (
                                <tr key={index} className="hover:bg-gray-700 transition-colors">
                                    <td className="px-6 py-2 whitespace-nowrap font-semibold text-white cursor-pointer" onClick={() => handleOpenPage(chapter._id)}>
                                        Chapter {chapter.chapter_number}
                                    </td>
                                    <td className="px-6 py-2 whitespace-nowrap text-gray-300">
                                        {chapter.updatedAt.split('T')[0]}
                                    </td>
                                    <td className="px-6 py-2 whitespace-nowrap text-gray-300">
                                        {chapter.views || 0}
                                    </td>
                                    <td className="px-6 py-2 whitespace-nowrap">
                                        <div className="flex space-x-4">
                                            <button
                                                className="text-gray-400 hover:text-blue-400 transition-colors p-2"
                                                title="Comment"
                                            >
                                                <img src={messageIcon} alt="Comment" className="w-6 h-6" />
                                            </button>
                                            <button
                                                className="text-gray-400 hover:text-green-400 transition-colors p-2"
                                                title="Download"
                                            >
                                                <img src={downloadIcon} alt="Download" className="w-6 h-6" />
                                            </button>
                                            <button
                                                className="text-gray-400 hover:text-purple-400 transition-colors p-2"
                                                title="View"
                                            >
                                                <img src={eyeicon} alt="View" className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Bottom Pagination */}
                <div className="flex justify-center mt-8">
                    <div className="flex items-center space-x-6 text-lg">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg ${currentPage === 1
                                ? 'bg-gray-700 cursor-not-allowed text-gray-500'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                        >
                            Previous
                        </button>
                        <span className="text-gray-300">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg ${currentPage === totalPages
                                ? 'bg-gray-700 cursor-not-allowed text-gray-500'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChaptersPage;