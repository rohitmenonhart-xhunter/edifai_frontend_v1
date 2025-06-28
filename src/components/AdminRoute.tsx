import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import authService from '@/services/authService';

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  
  // Note: This is a simplified check. The actual admin status is verified 
  // in the admin page components using the checkIsAdmin utility
  return isAuthenticated ? children : <Navigate to="/LoginPage" />;
};

export default AdminRoute; 