/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/AuthRoutes';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';

// Shared Components
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-bg">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
  </div>
);

// Lazy Loaded Pages
// Public
const Home = lazy(() => import('./pages/Home'));
const Rooms = lazy(() => import('./pages/Rooms'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Services = lazy(() => import('./pages/Services'));
const Branches = lazy(() => import('./pages/Branches'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));

// User
const MyBookings = lazy(() => import('./pages/MyBookings'));

// Admin
const Overview = lazy(() => import('./pages/admin/Overview'));
const Bookings = lazy(() => import('./pages/admin/Bookings'));
const UsersPage = lazy(() => import('./pages/admin/Users'));
const RoomsManagement = lazy(() => import('./pages/admin/Rooms'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const AppRoutes = () => {
  const { isAdmin } = useAuth();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public Routes with Main Navbar/Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/services" element={<Services />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={isAdmin ? <Navigate to="/admin" replace /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected User Routes */}
          <Route 
            path="/my-bookings" 
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* Admin Dashboard Routes - Completely Separate Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Overview />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="rooms" element={<RoomsManagement />} />
          <Route path="settings" element={<div className="p-8 text-center bg-white rounded-[40px] shadow-sm border border-gray-100"><h2 className="text-2xl font-serif font-bold">System Settings</h2><p className="text-gray-500 mt-2">Manage global site configurations and metadata.</p></div>} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Toaster position="top-center" reverseOrder={false} />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

