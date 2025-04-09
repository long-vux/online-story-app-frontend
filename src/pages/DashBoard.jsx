import React, { useState } from 'react';
import AdminNavbar from '../components/admin/AdminNavbar';
import StoryManagement from '../components/admin/StoryManagement';
import ChapterManagement from '../components/admin/ChapterManagement';
import PageManagement from '../components/admin/PageManagement';
import UserManagement from '../components/admin/UserManagement';

const Dashboard = ({ token }) => {
  const [activeSection, setActiveSection] = useState('user');

  return (
    <div className="justify-center  h-[400px] mt-[50px] flex flex-row">
      <div className='flex w-[70%] items-start'>
        <AdminNavbar setActiveSection={setActiveSection} activeSection={activeSection} />
        <div className="flex-1">
          {activeSection === 'user' && <UserManagement token={token} />}
          {activeSection === 'story' && <StoryManagement token={token} />}
          {activeSection === 'chapter' && <ChapterManagement token={token} />}
          {activeSection === 'page' && <PageManagement token={token} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;