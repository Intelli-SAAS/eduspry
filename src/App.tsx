
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Index from './pages/Index';
import NotFound from './pages/NotFound';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import UnauthorizedPage from './pages/auth/UnauthorizedPage';

// Onboarding
import { TenantTypePage, TenantInfoPage, ModuleSelectionPage, CompletionPage } from './pages/onboarding';

// Shared pages
import Calendar from './pages/shared/Calendar';
import CoursesList from './pages/shared/CoursesList';
import CourseDetail from './pages/shared/CourseDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
        {/* Onboarding routes */}
        <Route path="/onboarding/type" element={<TenantTypePage />} />
        <Route path="/onboarding/info" element={<TenantInfoPage />} />
        <Route path="/onboarding/modules" element={<ModuleSelectionPage />} />
        <Route path="/onboarding/complete" element={<CompletionPage />} />
        
        {/* Shared routes */}
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/courses" element={<CoursesList />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        
        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
