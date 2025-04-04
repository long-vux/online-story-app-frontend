import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainRoutes from './routes/MainRoutes';
import AdminRoutes from './routes/AdminRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>

    </Router>
  );
};

export default App;