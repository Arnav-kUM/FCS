import React from 'react';
import { Route, Navigate,Outlet } from 'react-router-dom';

function ProtectedRoute({ element, ...props }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" />;
  }

  return <Outlet element={element} {...props} />;
}

export default ProtectedRoute;
