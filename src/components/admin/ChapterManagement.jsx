import React from 'react';

const ChapterManagement = () => {
  const chapters = [
    { _id: '1', story_id: '1', chapter_number: 1, title: 'Chapter 1', content: 'Nội dung...' },
    { _id: '2', story_id: '1', chapter_number: 2, title: 'Chapter 2', content: 'Nội dung...' },
  ];

  return (
    <div className="p-6 flex-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">Chapter Management</h3>
        <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
          +
        </button>
      </div>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Story ID</th>
            <th className="p-2 border">Số chương</th>
            <th className="p-2 border">Tiêu đề</th>
            <th className="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {chapters.map((chapter) => (
            <tr key={chapter._id} className="hover:bg-gray-100">
              <td className="p-2 border">{chapter.story_id}</td>
              <td className="p-2 border">{chapter.chapter_number}</td>
              <td className="p-2 border">{chapter.title}</td>
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

export default ChapterManagement;