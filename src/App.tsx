import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import new pages
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AccountDetailsPage from "./pages/AccountDetailsPage";
import TransferPage from "./pages/TransferPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import NotFound from "./pages/NotFound"; // Always Must Include

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Application specific routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/account/:accountId" element={<AccountDetailsPage />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/profile-settings" element={<ProfileSettingsPage />} />

          {/* Set LoginPage as the index route or a redirect */}
          <Route path="/" element={<LoginPage />} /> 
          {/* Keep other existing routes if any before NotFound Page*/}

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;