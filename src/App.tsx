import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import { UserRole } from "@/modules/shared/types";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

// Layout
import AppLayout from "@/components/layout/AppLayout";

// Public Pages
import IndexPage from "@/pages/Index";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import LandingPage from "@/pages/LandingPage";

// Onboarding Pages
import {
  TenantTypePage,
  TenantInfoPage,
  ModuleSelectionPage,
  CompletionPage
} from "@/pages/onboarding";

// Auth Pages
import UnauthorizedPage from "@/pages/auth/UnauthorizedPage";

// Student Pages
import StudentDashboard from "@/pages/student/Dashboard";
import StudentTestsPage from "@/pages/student/Tests";
import TestTakingPage from "@/pages/student/TestTaking";
import TestResultPage from "@/pages/student/TestResult";
import StudentPerformancePage from "@/pages/student/Performance";
import AIStudyTools from "@/pages/student/AIStudyTools";

// Teacher Pages
import TeacherDashboard from "@/pages/teacher/Dashboard";
import TeacherStudentsPage from "@/pages/teacher/Students";
import TeacherQuestionBank from "@/pages/teacher/QuestionBank";
import TeacherAnalytics from "@/pages/teacher/Analytics";
import CreateTest from "@/pages/teacher/CreateTest";
import TestManagement from "@/pages/teacher/TestManagement";
import AIAssistant from '@/pages/teacher/AIAssistant';
import CreateVideoConference from "@/pages/teacher/CreateVideoConference";

// Principal Pages
import PrincipalDashboard from "@/pages/principal/Dashboard";
import PrincipalStudentsPage from "@/pages/principal/Students";
import TeachersPage from "@/pages/principal/Teachers";
import DepartmentsPage from "@/pages/principal/Departments";
import SchoolAnalytics from "@/pages/principal/SchoolAnalytics";
import SettingsPage from "@/pages/principal/Settings";
import ModuleManagement from "@/pages/principal/ModuleManagement";

// Shared Pages
import CalendarPage from "@/pages/shared/Calendar";
import NotFound from "@/pages/NotFound";
import VirtualClassroom from "@/pages/VirtualClassroom";
import CoursesList from "@/pages/shared/CoursesList";
import CourseDetail from "@/pages/shared/CourseDetail";

// Placeholder component for pages not yet implemented
const PlaceholderPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Coming Soon</h1>
    <p className="text-muted-foreground">This page is under development.</p>
  </div>
);

// SmartRedirect component to handle role-based redirects
const SmartRedirect = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case UserRole.TEACHER:
      return <Navigate to="/teacher/dashboard" replace />;
    case UserRole.PRINCIPAL:
      return <Navigate to="/principal/dashboard" replace />;
    case UserRole.STUDENT:
    default:
      return <Navigate to="/dashboard" replace />;
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OnboardingProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<IndexPage />} />
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

                {/* App entry point - redirects based on user role */}
                <Route path="/app" element={<SmartRedirect />} />

                {/* Student Routes */}
                <Route element={<AppLayout requiredRoles={[UserRole.STUDENT]} />}>
                  <Route path="/dashboard" element={<StudentDashboard />} />
                  <Route path="/tests" element={<StudentTestsPage />} />
                  <Route path="/tests/:testId/take" element={<TestTakingPage />} />
                  <Route path="/tests/:testId/result" element={<TestResultPage />} />
                  <Route path="/performance" element={<StudentPerformancePage />} />
                  <Route path="/study-tools" element={<AIStudyTools />} />
                </Route>

                {/* Teacher Routes */}
                <Route element={<AppLayout requiredRoles={[UserRole.TEACHER]} />}>
                  <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                  <Route path="/students" element={<TeacherStudentsPage />} />
                  <Route path="/questions/create" element={<TeacherQuestionBank />} />
                  <Route path="/questions/bank" element={<TeacherQuestionBank />} />
                  <Route path="/questions/import" element={<TeacherQuestionBank />} />
                  <Route path="/tests/create" element={<CreateTest />} />
                  <Route path="/tests/manage" element={<TestManagement />} />
                  <Route path="/tests/results" element={<TestManagement />} />
                  <Route path="/analytics" element={<TeacherAnalytics />} />
                  <Route path="/ai-assistant" element={<AIAssistant />} />
                  <Route path="/video-conference/create" element={<CreateVideoConference />} />
                </Route>

                {/* Principal Routes */}
                <Route element={<AppLayout requiredRoles={[UserRole.PRINCIPAL]} />}>
                  <Route path="/principal/dashboard" element={<PrincipalDashboard />} />
                  <Route path="/departments" element={<DepartmentsPage />} />
                  <Route path="/teachers" element={<TeachersPage />} />
                  <Route path="/students" element={<PrincipalStudentsPage />} />
                  <Route path="/analytics/school" element={<SchoolAnalytics />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/modules" element={<ModuleManagement />} />
                </Route>

                {/* Shared Routes (accessible to both teacher and student) */}
                <Route element={<AppLayout requiredRoles={[UserRole.TEACHER, UserRole.STUDENT]} />}>
                  <Route path="/calendar" element={<CalendarPage />} />
                  <Route path="/classroom/:classId" element={<VirtualClassroom />} />
                  <Route path="/courses" element={<CoursesList />} />
                  <Route path="/courses/:courseId" element={<CourseDetail />} />
                </Route>

                {/* Shared Routes (accessible to all roles including Principal) */}
                <Route element={<AppLayout requiredRoles={[UserRole.TEACHER, UserRole.STUDENT, UserRole.PRINCIPAL]} />}>
                  <Route path="/teacher/calendar" element={<CalendarPage />} />
                  <Route path="/principal/calendar" element={<CalendarPage />} />
                </Route>

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </OnboardingProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
