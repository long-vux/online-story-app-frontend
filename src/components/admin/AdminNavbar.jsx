import React from 'react';

const AdminNavbar = ({ setActiveSection }) => {
  return (
    <div className="w-48 h-screen bg-gray-100 border-r border-gray-300 flex flex-col p-4">
      <button
        onClick={() => setActiveSection('user')}
        className="mb-4 p-2 text-left font-semibold text-gray-700 hover:bg-gray-200 rounded transition-colors"
      >
        User
      </button>
      <button
        onClick={() => setActiveSection('story')}
        className="mb-4 p-2 text-left font-semibold text-gray-700 bg-gray-300 rounded transition-colors"
      >
        Story
      </button>
      <button
        onClick={() => setActiveSection('chapter')}
        className="mb-4 p-2 text-left font-semibold text-gray-700 hover:bg-gray-200 rounded transition-colors"
      >
        Chapter
      </button>
      <button
        onClick={() => setActiveSection('page')}
        className="p-2 text-left font-semibold text-gray-700 hover:bg-gray-200 rounded transition-colors"
      >
        Page
      </button>
    </div>
  );
};

export default AdminNavbar;