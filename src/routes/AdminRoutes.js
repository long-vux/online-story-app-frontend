import React from 'react'
import { Routes, Route } from 'react-router-dom'

// import CreateStoryForm from './pages/CreateStoryForm';
import HomePage from '../pages/HomePage';
// import {jwtDecode} from 'jwt-decode'
const AdminRoutes = () => {

  // const token = localStorage.getItem('token')
  // const decodedToken = jwtDecode(token)
  // if (decodedToken.role !== 'admin') {
  //   return <Navigate to='/' />
  // }

  return (
    <Routes>
      <Route path='/dashboard' element={ <HomePage /> } />
      
    </Routes>
  );
};

export default AdminRoutes;