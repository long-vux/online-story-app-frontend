import React, { useState } from 'react';
import AdminNavbar from '../components/admin/AdminNavbar';
import StoryManagement from '../components/admin/StoryManagement';
import ChapterManagement from '../components/admin/ChapterManagement';
import PageManagement from '../components/admin/PageManagement';
import UserManagement from '../components/admin/UserManagement';

const App = () => {
  const [activeSection, setActiveSection] = useState('user');

  return (
    <div className="justify-center  h-[400px] mt-[50px] flex flex-row">
      <div className='flex w-[70%] items-start'>
        <AdminNavbar setActiveSection={setActiveSection} activeSection={activeSection} />
        <div className="flex-1">
          {activeSection === 'user' && <UserManagement />}
          {activeSection === 'story' && <StoryManagement />}
          {activeSection === 'chapter' && <ChapterManagement />}
          {activeSection === 'page' && <PageManagement />}
        </div>
      </div>
    </div>
  );
};

export default App;