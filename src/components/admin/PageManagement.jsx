import React from 'react';

const PageManagement = () => {
  const pages = [
    { _id: '1', chapter_id: '1', image_url: 'url1.jpg', image_order: 1 },
    { _id: '2', chapter_id: '1', image_url: 'url2.jpg', image_order: 2 },
  ];

  return (
    <div className="p-6 flex-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">Page Management</h3>
        <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
          +
        </button>
      </div>
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
    </div>
  );
};

export default PageManagement;