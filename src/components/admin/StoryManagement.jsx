import React, { useState } from 'react';

const StoryManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStory, setNewStory] = useState({
    title: '',
    description: '',
    author: '',
    status: 'ongoing',
  });

  // Giả lập dữ liệu story
  const stories = [
    { _id: '1', title: 'Story 1', author: 'Author 1', status: 'ongoing', number_of_chapters: 5 },
    { _id: '2', title: 'Story 2', author: 'Author 2', status: 'completed', number_of_chapters: 10 },
  ];

  const handleAddStory = (e) => {
    e.preventDefault();
    // Logic để thêm story (gọi API)
    console.log('Thêm story:', newStory);
    setIsModalOpen(false);
    setNewStory({ title: '', description: '', author: '', status: 'ongoing' });
  };

  return (
    <div className="p-6 flex-1 relative">
      <h3 className="text-2xl font-semibold mb-4">Story Management</h3>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Tiêu đề</th>
            <th className="p-2 border">Tác giả</th>
            <th className="p-2 border">Trạng thái</th>
            <th className="p-2 border">Số chương</th>
            <th className="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {stories.map((story) => (
            <tr key={story._id} className="hover:bg-gray-100">
              <td className="p-2 border">{story.title}</td>
              <td className="p-2 border">{story.author}</td>
              <td className="p-2 border">{story.status}</td>
              <td className="p-2 border">{story.number_of_chapters}</td>
              <td className="p-2 border">
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Sửa</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Nút Thêm mới ở góc phải dưới */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600"
      >
        +
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Thêm Story Mới</h3>
            <form onSubmit={handleAddStory}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Tiêu đề</label>
                <input
                  type="text"
                  value={newStory.title}
                  onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Mô tả</label>
                <textarea
                  value={newStory.description}
                  onChange={(e) => setNewStory({ ...newStory, description: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Tác giả</label>
                <input
                  type="text"
                  value={newStory.author}
                  onChange={(e) => setNewStory({ ...newStory, author: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Trạng thái</label>
                <select
                  value={newStory.status}
                  onChange={(e) => setNewStory({ ...newStory, status: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Hủy
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryManagement;