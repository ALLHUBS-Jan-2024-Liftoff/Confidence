// components/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function AdminRoute({ children }) {
  const { user, isAdmin } = useAuth();
  return user && isAdmin() ? children : <Navigate to="/login" />;
}

export default AdminRoute;
