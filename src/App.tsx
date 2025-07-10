import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { initializeSampleData } from "@/utils/sampleData";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FreelancerDashboard from "./components/FreelancerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import WalletIntegration from "./components/WalletIntegration";
import CertificatesVerification from "./components/CertificatesVerification";
import Profile from "./pages/Profile";
import Marketplace from "./pages/Marketplace";
import Earnings from "./pages/Earnings";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";
import Messages from "./pages/Messages";
import PostJob from "./pages/PostJob";
import FindTalent from "./pages/FindTalent";
import Payments from "./pages/Payments";
import IssueCredentials from "./pages/IssueCredentials";
import UserManagementPage from "./pages/admin/UserManagement";
import GigManagementPage from "./pages/admin/GigManagement";
import DisputeManagementPage from "./pages/admin/DisputeManagement";
import SecurityManagementPage from "./pages/admin/SecurityManagement";
import SettingsPage from "./pages/admin/Settings";
import RecentActivityPage from "./pages/admin/RecentActivity";
import UserHistoryPage from "./pages/admin/UserHistory";
import VerifyCredentialsPage from "./pages/admin/VerifyCredentials";
import SuspendUserPage from "./pages/admin/SuspendUser";

const queryClient = new QueryClient();

// Initialize sample data for testing
initializeSampleData();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="gigchain-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagementPage />} />
            <Route path="/admin/users/:userId/history" element={<UserHistoryPage />} />
            <Route path="/admin/users/:userId/verify-credentials" element={<VerifyCredentialsPage />} />
            <Route path="/admin/users/:userId/suspend" element={<SuspendUserPage />} />
            <Route path="/admin/gigs" element={<GigManagementPage />} />
            <Route path="/admin/disputes" element={<DisputeManagementPage />} />
            <Route path="/admin/security" element={<SecurityManagementPage />} />
            <Route path="/admin/settings" element={<SettingsPage />} />
            <Route path="/admin/activity/:type" element={<RecentActivityPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/wallet" element={<WalletIntegration />} />
            <Route path="/certificates" element={<CertificatesVerification />} />
            <Route path="/earnings" element={<Earnings />} />
            <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/find-talent" element={<FindTalent />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/issue-credentials" element={<IssueCredentials />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
