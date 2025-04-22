import { React, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Comment = ({ story, currentUserId }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([...story.comments].reverse());

  const API_URL = process.env.REACT_APP_API_URL;
  const token = JSON.parse(localStorage.getItem("user"));

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `${API_URL}stories/${story._id}/comment`,
        {
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newCmt = response.data.comment; // hoặc response.data tùy API trả về
      toast.success("Comment added successfully!");
      setComments([newCmt, ...comments]); // thêm comment mới vào đầu
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="mt-10 bg-[#121212] p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
        <textarea
          className="w-full p-3 bg-[#1e1e1e] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-400 resize-none"
          rows="3"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
        />
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-lg transition"
          onClick={handlePostComment}
        >
          Post
        </button>
      </div>

      <div className="space-y-4">
        {comments.map((cmt, idx) => (
          <div
            key={idx}
            className="border-b border-gray-700 pb-4 text-gray-300"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-white">
              {currentUserId === cmt.userId?._id ? "You" : cmt.userId?.username || "Anonymous User"}
              </span>
              <span className="text-sm text-gray-500">
                {cmt.createdAt?.split("T")[0]}
              </span>
            </div>
            <p className="mt-2">{cmt.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
