import React, { useState } from 'react';
import AdminNavbar from '../components/admin/AdminNavbar';
import StoryManagement from '../components/admin/StoryManagement';
import ChapterManagement from '../components/admin/ChapterManagement';
import PageManagement from '../components/admin/PageManagement';
import UserManagement from '../components/admin/UserManagement';

const App = () => {
  const [activeSection, setActiveSection] = useState('story');

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminNavbar setActiveSection={setActiveSection} />
      <div className="flex-1">
        {activeSection === 'user' && <UserManagement />}
        {activeSection === 'story' && <StoryManagement />}
        {activeSection === 'chapter' && <ChapterManagement />}
        {activeSection === 'page' && <PageManagement />}
      </div>
    </div>
  );
};

export default App;