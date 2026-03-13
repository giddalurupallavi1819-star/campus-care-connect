import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import DashboardRedirect from "./pages/dashboard/DashboardRedirect";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import StudentWellness from "./pages/dashboard/StudentWellness";
import AIChatbot from "./pages/dashboard/AIChatbot";
import FacultyDashboard from "./pages/dashboard/FacultyDashboard";
import CounselorDashboard from "./pages/dashboard/CounselorDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AlertsPage from "./pages/dashboard/AlertsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function DashboardWrapper({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  return (
    <ProtectedRoute allowedRoles={roles}>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<DashboardWrapper><DashboardRedirect /></DashboardWrapper>} />

            {/* Student routes */}
            <Route path="/dashboard/student" element={<DashboardWrapper roles={['student']}><StudentDashboard /></DashboardWrapper>} />
            <Route path="/dashboard/student/wellness" element={<DashboardWrapper roles={['student']}><StudentWellness /></DashboardWrapper>} />
            <Route path="/dashboard/student/academics" element={<DashboardWrapper roles={['student']}><StudentDashboard /></DashboardWrapper>} />
            <Route path="/dashboard/student/chatbot" element={<DashboardWrapper roles={['student']}><AIChatbot /></DashboardWrapper>} />
            <Route path="/dashboard/student/appointments" element={<DashboardWrapper roles={['student']}><StudentWellness /></DashboardWrapper>} />

            {/* Faculty routes */}
            <Route path="/dashboard/faculty" element={<DashboardWrapper roles={['faculty']}><FacultyDashboard /></DashboardWrapper>} />
            <Route path="/dashboard/faculty/students" element={<DashboardWrapper roles={['faculty']}><FacultyDashboard /></DashboardWrapper>} />
            <Route path="/dashboard/faculty/analytics" element={<DashboardWrapper roles={['faculty']}><FacultyDashboard /></DashboardWrapper>} />
            <Route path="/dashboard/faculty/alerts" element={<DashboardWrapper roles={['faculty']}><AlertsPage /></DashboardWrapper>} />

            {/* Counselor routes */}
            <Route path="/dashboard/counselor" element={<DashboardWrapper roles={['counselor']}><CounselorDashboard /></DashboardWrapper>} />
            <Route path="/dashboard/counselor/at-risk" element={<DashboardWrapper roles={['counselor']}><CounselorDashboard /></DashboardWrapper>} />
            <Route path="/dashboard/counselor/sessions" element={<DashboardWrapper roles={['counselor']}><CounselorDashboard /></DashboardWrapper>} />
            <Route path="/dashboard/counselor/alerts" element={<DashboardWrapper roles={['counselor']}><AlertsPage /></DashboardWrapper>} />
            <Route path="/dashboard/counselor/reports" element={<DashboardWrapper roles={['counselor']}><CounselorDashboard /></DashboardWrapper>} />

            {/* Admin routes */}
            <Route path="/dashboard/admin" element={<DashboardWrapper roles={['admin']}><AdminDashboard /></DashboardWrapper>} />
            <Route path="/dashboard/admin/students" element={<DashboardWrapper roles={['admin']}><AdminDashboard /></DashboardWrapper>} />
            <Route path="/dashboard/admin/analytics" element={<DashboardWrapper roles={['admin']}><AdminDashboard /></DashboardWrapper>} />
            <Route path="/dashboard/admin/alerts" element={<DashboardWrapper roles={['admin']}><AlertsPage /></DashboardWrapper>} />
            <Route path="/dashboard/admin/heatmap" element={<DashboardWrapper roles={['admin']}><AdminDashboard /></DashboardWrapper>} />
            <Route path="/dashboard/admin/settings" element={<DashboardWrapper roles={['admin']}><AdminDashboard /></DashboardWrapper>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
