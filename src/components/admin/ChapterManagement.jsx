import React, { useState } from 'react';
import { FiEdit, FiTrash2  } from "react-icons/fi";

const ChapterManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChapter, setNewChapter] = useState({
    story_id: '',
    chapter_number: '',
    title: '',
    content: '',
  });

  const chapters = [
    { _id: '1', story_id: '1', chapter_number: 1, title: 'Chapter 1', content: 'Nội dung...' },
    { _id: '2', story_id: '1', chapter_number: 2, title: 'Chapter 2', content: 'Nội dung...' },
  ];

  const handleAddChapter = (e) => {
    e.preventDefault();
    // Logic để thêm chapter (gọi API)
    console.log('Thêm chapter:', newChapter);
    setIsModalOpen(false);
    setNewChapter({ story_id: '', chapter_number: '', title: '', content: '' });
  };

  return (
    <div className="p-6 pt-0 flex-1 relative">
      <h3 className="text-2xl font-semibold mb-4">Chapter Management</h3>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Story ID</th>
            <th className="p-2 border">Số chương</th>
            <th className="p-2 border">Tiêu đề</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {chapters.map((chapter) => (
            <tr key={chapter._id} className="hover:bg-gray-100">
              <td className="p-2 border text-center">{chapter.story_id}</td>
              <td className="p-2 border text-center">{chapter.chapter_number}</td>
              <td className="p-2 border text-center">{chapter.title}</td>
              <td className="p-2 border text-center">
                <button className="bg-blue-500 text-white px-2 py-2 rounded mr-2"><FiEdit /></button>
                <button className="bg-red-500 text-white px-2 py-2 rounded"><FiTrash2 /></button>
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
            <h3 className="text-xl font-semibold mb-4">Thêm Chapter Mới</h3>
            <form onSubmit={handleAddChapter}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Story ID</label>
                <input
                  type="text"
                  value={newChapter.story_id}
                  onChange={(e) => setNewChapter({ ...newChapter, story_id: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Số chương</label>
                <input
                  type="number"
                  value={newChapter.chapter_number}
                  onChange={(e) => setNewChapter({ ...newChapter, chapter_number: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Tiêu đề</label>
                <input
                  type="text"
                  value={newChapter.title}
                  onChange={(e) => setNewChapter({ ...newChapter, title: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nội dung</label>
                <textarea
                  value={newChapter.content}
                  onChange={(e) => setNewChapter({ ...newChapter, content: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
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

export default ChapterManagement;