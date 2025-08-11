import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AnalyticsDashboard from './pages/analytics-dashboard';
import LoginPage from './pages/login';
import ContentCreator from './pages/content-creator';
import AccountSettings from './pages/account-settings';
import Dashboard from './pages/dashboard';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AccountSettings />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/content-creator" element={<ContentCreator />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
