import React from 'react'
import { Routes, Route } from 'react-router-dom'
// import Layout from '../components/admin/layout/Layout'
import StoryDetail from '../pages/StoryDetail';
import Header from '../components/layout/Header';
import HomePage from '../pages/HomePage';
import ChapterItem from '../pages/ChapterItem';
// import Chapters from '../pages/ChaptersModal';
// import { Navigate } from 'react-router-dom'
// import {jwtDecode} from 'jwt-decode'
const AdminRoutes = () => {

  //   const token = localStorage.getItem('token')
  //   const decodedToken = jwtDecode(token)
  //   if (decodedToken.role !== 'admin') {
  //     return <Navigate to='/' />
  //   }

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/story-detail' element={<StoryDetail />} />
        <Route path='/chapter-item' element={<ChapterItem />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;