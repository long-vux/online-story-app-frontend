import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../components/layout/Header';
// import CreateStoryForm from './pages/CreateStoryForm';
import DashBoard from '../pages/DashBoard';
import { jwtDecode } from 'jwt-decode';
const AdminRoutes = () => {

  // Giải mã token
  const token = JSON.parse(localStorage.getItem('user'));
  const decodedToken = jwtDecode(token);

  // Kiểm tra vai trò của người dùng
  if (decodedToken.role !== 'Admin') {
    return <div className='w-full h-screen flex justify-center items-center text-3xl font-bold '>Access Denied</div>;
  }

  return (
    <>
      <Header />

      <Routes>
        <Route path='/dashboard' element={<DashBoard token={token} />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;