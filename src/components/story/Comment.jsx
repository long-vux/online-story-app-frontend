import {React, useState} from 'react';

const Comment = () => {
    const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    {
      user: "User 1",
      comment: "This is a great manga!",
      date: "2023-08-25",
    },
    {
      user: "User 2",
      comment: "I really enjoyed this manga!",
      date: "2023-08-24",
    },
  ]);

  const handlePostComment = () => {
    if (newComment.trim() !== "") {
      const newItem = {
        user: "You",
        comment: newComment,
        date: new Date().toISOString().slice(0, 10),
      };
      setComments([newItem, ...comments]);
      setNewComment("");
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
                                {cmt.user}
                            </span>
                            <span className="text-sm text-gray-500">{cmt.date}</span>
                        </div>
                        <p className="mt-2">{cmt.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Comment;