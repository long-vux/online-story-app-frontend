import React from 'react';

const AdminNavbar = ({ setActiveSection, activeSection }) => {
  return (
    <div className="w-48 bg-gray-100 border-gray-300 flex flex-col p-4 rounded-lg">
      <button
        onClick={() => setActiveSection('user')}
        className={`mb-4 p-2 text-left font-semibold rounded transition-colors ${
          activeSection === 'user'
            ? 'bg-blue-500 text-white'
            : 'text-gray-700 hover:bg-gray-200'
        }`}
      >
        User
      </button>
      <button
        onClick={() => setActiveSection('story')}
        className={`mb-4 p-2 text-left font-semibold rounded transition-colors ${
          activeSection === 'story'
            ? 'bg-blue-500 text-white'
            : 'text-gray-700 hover:bg-gray-200'
        }`}
      >
        Story
      </button>
      <button
        onClick={() => setActiveSection('chapter')}
        className={`mb-4 p-2 text-left font-semibold rounded transition-colors ${
          activeSection === 'chapter'
            ? 'bg-blue-500 text-white'
            : 'text-gray-700 hover:bg-gray-200'
        }`}
      >
        Chapter
      </button>
      <button
        onClick={() => setActiveSection('page')}
        className={`p-2 text-left font-semibold rounded transition-colors ${
          activeSection === 'page'
            ? 'bg-blue-500 text-white'
            : 'text-gray-700 hover:bg-gray-200'
        }`}
      >
        Page
      </button>
    </div>
  );
};

export default AdminNavbar;