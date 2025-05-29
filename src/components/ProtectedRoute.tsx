import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // Show loading indicator or wait until we know the authentication status
  if (loading) {
    // You could return a loading spinner here if you want
    return <div>Loading...</div>;
  }
  
  // Only redirect if we're sure the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // User is authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
