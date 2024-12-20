import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Static Pages
import AboutPage from './pages/static/AboutPage';
import ContactPage from './pages/static/ContactPage';
import PrivacyPage from './pages/static/PrivacyPage';
import TermsPage from './pages/static/TermsPage';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Tools from './pages/admin/Tools';
import Categories from './pages/admin/Categories';
import Messages from './pages/admin/Messages';
import Users from './pages/admin/Users';
import Submissions from './pages/admin/Submissions';
import LoginPage from './pages/admin/auth/LoginPage';
import SetupPage from './pages/admin/auth/SetupPage';

// Main Pages
import ApplicationsPage from './pages/applications/ApplicationsPage';

// Components
import { SubmitModal } from './components/SubmitModal';
import { ScrollToTop } from './components/ScrollToTop';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

// Auth Route Component (redirects to dashboard if already logged in)
function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<ApplicationsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Auth Routes */}
          <Route path="/admin/login" element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          } />
          <Route path="/admin/setup" element={
            <AuthRoute>
              <SetupPage />
            </AuthRoute>
          } />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <Navigate to="/admin/dashboard" replace />
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/tools" element={
            <ProtectedRoute>
              <Tools />
            </ProtectedRoute>
          } />
          <Route path="/admin/categories" element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          } />
          <Route path="/admin/messages" element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          } />
          <Route path="/admin/submissions" element={
            <ProtectedRoute>
              <Submissions />
            </ProtectedRoute>
          } />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global Components */}
        <SubmitModal />
      </AuthProvider>
    </Router>
  );
}
