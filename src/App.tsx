import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

// Layout
import AppLayout from "@/components/layout/AppLayout";

// Public Pages
import IndexPage from "@/pages/Index";

// Auth Pages
import LoginPage from "@/pages/auth/LoginPage";
import UnauthorizedPage from "@/pages/auth/UnauthorizedPage";

// Student Pages
import StudentDashboard from "@/pages/student/Dashboard";
import StudentTestsPage from "@/pages/student/Tests";
import TestTakingPage from "@/pages/student/TestTaking";
import TestResultPage from "@/pages/student/TestResult";
import StudentPerformancePage from "@/pages/student/Performance";

// Teacher Pages
import TeacherDashboard from "@/pages/teacher/Dashboard";
import TeacherStudentsPage from "@/pages/teacher/Students";
import TeacherQuestionBank from "@/pages/teacher/QuestionBank";
import TeacherAnalytics from "@/pages/teacher/Analytics";
import CreateTest from "@/pages/teacher/CreateTest";
import TestManagement from "@/pages/teacher/TestManagement";
import AIAssistant from '@/pages/teacher/AIAssistant';

// Principal Pages
import PrincipalDashboard from "@/pages/principal/Dashboard";
import PrincipalStudentsPage from "@/pages/principal/Students";
import TeachersPage from "@/pages/principal/Teachers";
import DepartmentsPage from "@/pages/principal/Departments";
import SchoolAnalytics from "@/pages/principal/SchoolAnalytics";
import SettingsPage from "@/pages/principal/Settings";

// Shared Pages
import CalendarPage from "@/pages/shared/Calendar";
import NotFound from "@/pages/NotFound";

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
  
  switch(user.role) {
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
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<IndexPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              
              {/* App entry point - redirects based on user role */}
              <Route path="/app" element={<SmartRedirect />} />
              
              {/* Student Routes */}
              <Route element={<AppLayout requiredRoles={[UserRole.STUDENT]} />}>
                <Route path="/dashboard" element={<StudentDashboard />} />
                <Route path="/tests" element={<StudentTestsPage />} />
                <Route path="/tests/:testId/take" element={<TestTakingPage />} />
                <Route path="/tests/:testId/result" element={<TestResultPage />} />
                <Route path="/performance" element={<StudentPerformancePage />} />
                <Route path="/calendar" element={<CalendarPage />} />
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
                <Route path="/calendar" element={<CalendarPage />} />
              </Route>
              
              {/* Principal Routes */}
              <Route element={<AppLayout requiredRoles={[UserRole.PRINCIPAL]} />}>
                <Route path="/principal/dashboard" element={<PrincipalDashboard />} />
                <Route path="/departments" element={<DepartmentsPage />} />
                <Route path="/teachers" element={<TeachersPage />} />
                <Route path="/students" element={<PrincipalStudentsPage />} />
                <Route path="/analytics/school" element={<SchoolAnalytics />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
