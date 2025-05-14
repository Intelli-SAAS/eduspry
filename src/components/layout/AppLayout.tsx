import React, { useState } from 'react';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import { UserRole } from '@/types';
import VoiceAssistant from '../VoiceAssistant';
import { UserRole as VoiceUserRole } from '@/services/voiceCommandService';
import { toast } from '@/components/ui/use-toast';

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
  const navigate = useNavigate();
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

  // Map our app's UserRole to VoiceUserRole for the voice assistant
  const mapUserRole = (role?: UserRole): VoiceUserRole => {
    if (!role) return VoiceUserRole.STUDENT;
    
    switch (role) {
      case UserRole.TEACHER:
        return VoiceUserRole.TEACHER;
      case UserRole.PRINCIPAL:
        return VoiceUserRole.PRINCIPAL;
      case UserRole.STUDENT:
      default:
        return VoiceUserRole.STUDENT;
    }
  };

  // Handle voice commands
  const handleVoiceCommand = (result: any) => {
    console.log('Voice command processed:', result); // Add logging to help diagnose issues
    
    // Handle different action types
    switch (result.action) {
      case 'navigate':
        // Map the target to actual application routes
        let targetRoute = '';
        
        if (user) {
          // Teacher-specific routes
          if (user.role === UserRole.TEACHER) {
            switch (result.target) {
              case 'test-creator':
                targetRoute = '/tests/create';
                break;
              case 'performance-analytics':
                targetRoute = '/analytics';
                break;
              case 'lesson-plan':
                // Route to AI Assistant with specific parameters
                targetRoute = '/ai-assistant';
                break;
              case 'flashcards':
                targetRoute = '/ai-assistant';
                break;
              case 'question-bank':
                targetRoute = '/questions/bank';
                break;
              case 'dashboard':
                targetRoute = '/teacher/dashboard';
                break;
              case 'students':
                targetRoute = '/students';
                break;
              case 'calendar':
                targetRoute = '/calendar';
                break;
              default:
                // Handle unknown teacher routes
                if (result.target.startsWith('teacher/')) {
                  targetRoute = `/${result.target}`;
                } else {
                  targetRoute = `/teacher/${result.target}`;
                }
                break;
            }
          }
          // Student-specific routes
          else if (user.role === UserRole.STUDENT) {
            switch (result.target) {
              case 'doubt-solver':
                targetRoute = '/study-tools';
                break;
              case 'quiz':
                targetRoute = '/tests';
                break;
              case 'performance':
                targetRoute = '/performance';
                break;
              case 'dashboard':
                targetRoute = '/dashboard';
                break;
              case 'flashcards':
                targetRoute = '/study-tools/flashcards';
                break;
              case 'calendar':
                targetRoute = '/calendar';
                break;
              case 'subjects':
                targetRoute = '/subjects';
                break;
              default:
                // Check if this is a specific subject
                if (['physics', 'chemistry', 'biology', 'mathematics'].includes(result.target)) {
                  targetRoute = `/subjects/${result.target}`;
                } 
                // If target has a student/ prefix, strip it for direct navigation
                else if (result.target.startsWith('student/')) {
                  targetRoute = `/${result.target.substring(8)}`;
                }
                // Default case - try direct navigation but don't add additional prefixes
                else {
                  targetRoute = `/${result.target}`;
                }
                break;
            }
          }
          // Principal-specific routes
          else if (user.role === UserRole.PRINCIPAL) {
            switch (result.target) {
              case 'institutional-report':
                targetRoute = '/analytics/school';
                break;
              case 'teacher-performance':
                targetRoute = '/teachers';
                break;
              case 'dashboard':
                targetRoute = '/principal/dashboard';
                break;
              default:
                targetRoute = `/principal/${result.target}`;
                break;
            }
          }
        }
        
        // Only navigate if we have a valid target route
        if (targetRoute) {
          // Construct the query string from params
          const queryParams = new URLSearchParams();
          if (result.params) {
            Object.entries(result.params).forEach(([key, value]) => {
              queryParams.append(key, String(value));
            });
          }
          
          const queryString = queryParams.toString();
          const url = `${targetRoute}${queryString ? `?${queryString}` : ''}`;
          
          console.log('Navigating to:', url); // Log the URL for debugging
          
          // Navigate to the target route
          navigate(url);
          
          // Also show a toast to confirm the navigation
          toast({
            title: "Voice Assistant",
            description: result.response,
          });
        } else {
          // If we couldn't determine a valid route, show an error
          console.error('Could not determine route for target:', result.target);
          toast({
            title: "Navigation Error",
            description: "I couldn't find the page you requested.",
            variant: "destructive"
          });
        }
        break;
        
      case 'dialog':
        // Show a dialog/toast with the response
        toast({
          title: "Voice Assistant",
          description: result.response,
        });
        break;
        
      case 'error':
        // Show error message
        console.error('Voice command error:', result.response);
        toast({
          title: "Error",
          description: result.response,
          variant: "destructive"
        });
        break;
        
      default:
        console.error('Unknown action type:', result.action);
        toast({
          title: "Error",
          description: "Unknown command action. Please try again.",
          variant: "destructive"
        });
        break;
    }
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
      
      {/* Voice Assistant Component */}
      {user && (
        <VoiceAssistant
          userRole={mapUserRole(user.role)}
          onCommandProcessed={handleVoiceCommand}
          selectedModel="gpt-4o"
        />
      )}
    </div>
  );
};

export default AppLayout;
