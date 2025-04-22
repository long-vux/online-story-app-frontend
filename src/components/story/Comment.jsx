import { React, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Import icons
import { jwtDecode } from 'jwt-decode';

const Comment = ({ story, currentUserId }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([...story.comments].reverse());
  const [editingComment, setEditingComment] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;
  const token = JSON.parse(localStorage.getItem("user"));
  const userId = jwtDecode(token).userId;

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

  const handleEditComment = async (commentId, content) => {
    setEditingComment(commentId);
    setNewComment(content);
  };

  const handleUpdateComment = async () => {
    if (!newComment.trim()) return;
  
    try {
      const response = await axios.put(
        `${API_URL}stories/${story._id}/comment/${editingComment}`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setNewComment("");  // reset nội dung textarea
      setEditingComment(null);  // reset trạng thái chỉnh sửa
      toast.success("Comment updated successfully!");
      window.location.reload(); // reload lại trang để cập nhật comment mới
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };


  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `${API_URL}stories/${story._id}/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments((prevComments) =>
        prevComments.filter((cmt) => cmt._id !== commentId)
      );
      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
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
          onClick={editingComment ? handleUpdateComment : handlePostComment}
        >
          {editingComment ? "Update" : "Post"}
        </button>
      </div>

      <div className="space-y-4">
        {comments.map((cmt, idx) => (
          <div key={idx} className="border-b border-gray-700 pb-4 text-gray-300">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-white">
                {currentUserId === cmt.userId?._id
                  ? "You"
                  : cmt.userId?.username || "Anonymous User"}
              </span>
              <span className="text-sm text-gray-500">
                {cmt.createdAt?.split("T")[0]}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="">{cmt.content}</p>
              {currentUserId === cmt.userId?._id && (
                <div className="flex gap-4 text-sm text-gray-500 ">
                  <button
                    className=" flex items-center gap-1 hover:text-gray-300"
                    onClick={() => handleEditComment(cmt._id, cmt.content)}
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    className=" flex items-center gap-1 hover:text-gray-300"
                    onClick={() => handleDeleteComment(cmt._id)}
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              )}

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
