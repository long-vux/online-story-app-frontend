import React from 'react';

const StoryManagement = () => {
  // Giả lập dữ liệu story (thay bằng API sau)
  const stories = [
    { _id: '1', title: 'Story 1', author: 'Author 1', status: 'ongoing', number_of_chapters: 5 },
    { _id: '2', title: 'Story 2', author: 'Author 2', status: 'completed', number_of_chapters: 10 },
  ];

  return (
    <div className="p-6 flex-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">Story Management</h3>
        <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
          +
        </button>
      </div>
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
    </div>
  );
};

export default StoryManagement;