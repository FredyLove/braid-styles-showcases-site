import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import ClientDashboard from "./components/ClientDashboard/ClientDashboard"
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import EditProfile from "./components/ClientDashboard/EditProfile";
import ProfilePage from "./pages/ProfilePage";
import UserBookings from "./components/UserBookings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/bookings" element={<UserBookings />} />
          
          {/* ✅ Protected route */}
          <Route
            path="/client-dashboard"
            element={
              <ProtectedRoute requiredRole="user">
                <ClientDashboard />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard/>
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<NotFound />} />
          <Route path="/unauthorized" element={<Unauthorized/>} />
          <Route path="/edit-profile" element={ <EditProfile/> }/>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
