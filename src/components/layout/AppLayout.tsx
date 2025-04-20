
import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import { UserRole } from '@/types';

interface AppLayoutProps {
  requiredRoles?: UserRole[];
}

const AppLayout: React.FC<AppLayoutProps> = ({ requiredRoles = [] }) => {
  const { isAuthenticated, checkPermission, isLoading, user } = useAuth();
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect unauthenticated users
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Check permissions if required roles are specified
  if (requiredRoles.length > 0 && !checkPermission(requiredRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Redirect users to their proper dashboard if they're on the wrong one
  if (user && requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    // Determine where to redirect based on role
    let redirectPath = '/';
    switch(user.role) {
      case UserRole.TEACHER:
        redirectPath = '/teacher/dashboard';
        break;
      case UserRole.PRINCIPAL:
        redirectPath = '/principal/dashboard';
        break;
      case UserRole.STUDENT:
        redirectPath = '/dashboard';
        break;
    }
    
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
