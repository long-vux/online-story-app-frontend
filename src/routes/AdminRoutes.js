import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../components/layout/Header';
// import CreateStoryForm from './pages/CreateStoryForm';
import DashBoard from '../pages/DashBoard';
// import {jwtDecode} from 'jwt-decode'
const AdminRoutes = () => {

  // const token = localStorage.getItem('token')
  // const decodedToken = jwtDecode(token)
  // if (decodedToken.role !== 'admin') {
  //   return <Navigate to='/' />
  // }

  return (
    <>
    <Header />

    <Routes>
      <Route path='/dashboard' element={ <DashBoard /> } />
      
    </Routes></>
  );
};

export default AdminRoutes;