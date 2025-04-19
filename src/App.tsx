
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserRole } from "@/types";

// Layout
import AppLayout from "@/components/layout/AppLayout";

// Auth Pages
import LoginPage from "@/pages/auth/LoginPage";
import UnauthorizedPage from "@/pages/auth/UnauthorizedPage";

// Student Pages
import StudentDashboard from "@/pages/student/Dashboard";
import StudentTestsPage from "@/pages/student/Tests";
import TestTakingPage from "@/pages/student/TestTaking";
import TestResultPage from "@/pages/student/TestResult";
import StudentPerformancePage from "@/pages/student/Performance";

// Common/Shared Pages
import NotFound from "@/pages/NotFound";

// Placeholder components for teacher and principal pages
const PlaceholderPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Coming Soon</h1>
    <p className="text-muted-foreground">This page is under development.</p>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            
            {/* Redirect root to login or dashboard based on auth */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Student Routes */}
            <Route element={<AppLayout requiredRoles={[UserRole.STUDENT]} />}>
              <Route path="/dashboard" element={<StudentDashboard />} />
              <Route path="/tests" element={<StudentTestsPage />} />
              <Route path="/tests/:testId/take" element={<TestTakingPage />} />
              <Route path="/tests/:testId/result" element={<TestResultPage />} />
              <Route path="/performance" element={<StudentPerformancePage />} />
            </Route>
            
            {/* Teacher Routes */}
            <Route element={<AppLayout requiredRoles={[UserRole.TEACHER]} />}>
              <Route path="/teacher/dashboard" element={<PlaceholderPage />} />
              <Route path="/students" element={<PlaceholderPage />} />
              <Route path="/questions/create" element={<PlaceholderPage />} />
              <Route path="/questions/bank" element={<PlaceholderPage />} />
              <Route path="/questions/import" element={<PlaceholderPage />} />
              <Route path="/tests/create" element={<PlaceholderPage />} />
              <Route path="/tests/manage" element={<PlaceholderPage />} />
              <Route path="/tests/results" element={<PlaceholderPage />} />
              <Route path="/analytics" element={<PlaceholderPage />} />
            </Route>
            
            {/* Principal Routes */}
            <Route element={<AppLayout requiredRoles={[UserRole.PRINCIPAL]} />}>
              <Route path="/principal/dashboard" element={<PlaceholderPage />} />
              <Route path="/departments" element={<PlaceholderPage />} />
              <Route path="/teachers" element={<PlaceholderPage />} />
              <Route path="/analytics/school" element={<PlaceholderPage />} />
              <Route path="/settings" element={<PlaceholderPage />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
