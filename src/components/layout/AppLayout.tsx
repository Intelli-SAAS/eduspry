import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import { UserRole } from '@/types';

interface AppLayoutProps {
  requiredRoles?: UserRole[];
}

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] text-white shadow-md overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]"></div>
      
      {/* Top border accent */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-indigo-400"></div>
      
      <div className="container relative z-10 flex flex-col items-center justify-between gap-4 md:flex-row py-4">
        <p className="text-center text-sm text-white/90">
          &copy; {new Date().getFullYear()} EduSpry. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-white/80">
          <a href="#" className="hover:text-white transition-colors hover:underline">Help</a>
          <a href="#" className="hover:text-white transition-colors hover:underline">Privacy</a>
          <a href="#" className="hover:text-white transition-colors hover:underline">Terms</a>
        </div>
      </div>
    </footer>
  );
};

const AppLayout: React.FC<AppLayoutProps> = ({ requiredRoles = [] }) => {
  const { isAuthenticated, checkPermission, isLoading, user, tenant } = useAuth();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div
          className="h-12 w-12 rounded-full border-4 border-transparent border-t-[#1a4480] animate-spin"
        />
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
  
  // Handle sidebar collapse state
  const handleSidebarCollapse = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Sidebar onCollapseChange={handleSidebarCollapse} />
      <div 
        className="flex-1 flex flex-col"
        style={{
          marginLeft: sidebarCollapsed ? '72px' : '280px',
          transition: 'margin-left 0.3s ease'
        }}
      >
        <Header />
        <main 
          className="flex-1 flex flex-col pt-16 pb-0 px-4"
        >
          {tenant && (
            <div className="bg-gradient-to-r from-[#112F4E]/10 to-transparent py-2 px-4 rounded-lg shadow-sm mt-4 mb-2 backdrop-blur-sm">
              <h1 className="text-lg font-semibold text-[#112F4E]">{tenant.name}</h1>
            </div>
          )}
          <div className="mx-auto max-w-7xl py-6 w-full flex-1">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
