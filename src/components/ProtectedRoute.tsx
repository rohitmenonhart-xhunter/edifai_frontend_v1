import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, AUTH_STATE_CHANGED_EVENT } from '@/App';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, checkAuthStatus } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(isAuthenticated);
  const location = useLocation();

  useEffect(() => {
    // Update local state when context changes
    setIsAuth(isAuthenticated);
    
    // Mark as checked once we have a definitive answer
    if (!authChecked) {
      setAuthChecked(true);
    }
    
    // Listen for auth state change events
    const handleAuthChange = (event: any) => {
      const { isAuthenticated } = event.detail;
      console.log("Auth state changed event received in ProtectedRoute:", { isAuthenticated });
      setIsAuth(isAuthenticated);
    };
    
    window.addEventListener(AUTH_STATE_CHANGED_EVENT, handleAuthChange);
    
    return () => {
      window.removeEventListener(AUTH_STATE_CHANGED_EVENT, handleAuthChange);
    };
  }, [isAuthenticated]);

  // Force check auth status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Show loading state until auth is checked
  if (!authChecked) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8A63FF]"></div>
    </div>;
  }

  // Redirect to login if not authenticated
  if (!isAuth) {
    return <Navigate to="/LoginPage" state={{ from: location }} replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute; 