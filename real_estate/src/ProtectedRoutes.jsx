import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './context/authContext';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  // Check if the user has one of the allowed roles
  if (user && allowedRoles.includes(user.role)) {
    return element;
  } else {
    // Redirect to a login page or another route
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;