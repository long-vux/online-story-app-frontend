import React, { useState } from 'react';

const PageManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPage, setNewPage] = useState({ chapter_id: '', image_url: '', image_order: '' });

  const pages = [
    { _id: '1', chapter_id: '1', image_url: 'url1.jpg', image_order: 1 },
    { _id: '2', chapter_id: '1', image_url: 'url2.jpg', image_order: 2 },
  ];

  const handleAddPage = (e) => {
    e.preventDefault();
    // Logic để thêm page (gọi API)
    console.log('Thêm page:', newPage);
    setIsModalOpen(false);
    setNewPage({ chapter_id: '', image_url: '', image_order: '' });
  };

  return (
    <div className="p-6 flex-1 relative">
      <h3 className="text-2xl font-semibold mb-4">Page Management</h3>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Chapter ID</th>
            <th className="p-2 border">URL Ảnh</th>
            <th className="p-2 border">Thứ tự</th>
            <th className="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page) => (
            <tr key={page._id} className="hover:bg-gray-100">
              <td className="p-2 border">{page.chapter_id}</td>
              <td className="p-2 border">{page.image_url}</td>
              <td className="p-2 border">{page.image_order}</td>
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
            <h3 className="text-xl font-semibold mb-4">Thêm Page Mới</h3>
            <form onSubmit={handleAddPage}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Chapter ID</label>
                <input
                  type="text"
                  value={newPage.chapter_id}
                  onChange={(e) => setNewPage({ ...newPage, chapter_id: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">URL Ảnh</label>
                <input
                  type="text"
                  value={newPage.image_url}
                  onChange={(e) => setNewPage({ ...newPage, image_url: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Thứ tự</label>
                <input
                  type="number"
                  value={newPage.image_order}
                  onChange={(e) => setNewPage({ ...newPage, image_order: e.target.value })}
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

export default PageManagement;