import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Toast } from './components/common/Toast';
import { CommandPalette } from './components/common/CommandPalette';

// Auth & Onboarding Flow Pages
import { QRScannerPage } from './components/auth/QRScannerPage';
import { GetStartedPage } from './components/auth/GetStartedPage';
import { LoginPage } from './components/auth/LoginPage';
import { CustomerLoginPage } from './components/auth/CustomerLoginPage';
import { CustomerOTPPage } from './components/auth/CustomerOTPPage';
import { CustomerDashboardPage } from './components/auth/CustomerDashboardPage';
import { RegistrationPage } from './components/auth/RegistrationPage';
import { AdminLoginPage } from './components/auth/AdminLoginPage';
import { AdminOTPPage } from './components/auth/AdminOTPPage';

// Main Application Panels
import { CustomerApp } from './components/customer/CustomerApp';
import { CustomerProfile } from './components/customer/CustomerProfile';
import { RestaurantPanel } from './components/restaurant/RestaurantPanel';
import { DriverApp } from './components/driver/DriverApp';
import { SupportPanel } from './components/support/SupportPanel';
import { SuperAdminPanel } from './components/admin/SuperAdminPanel';
import { QRManagement } from './components/admin/QRManagement';

const AppContent = () => {
  const { currentRole } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] dark:bg-[#071535] text-[#0F172A] dark:text-slate-100 font-sans selection:bg-[#2563EB] selection:text-white">
      {/* Top Navigation Header (hidden on QR scanner and Auth screens) */}
      {!['/scan', '/get-started', '/login', '/customer/login', '/verify-otp', '/register', '/admin/login', '/admin/verify-otp'].includes(window.location.pathname) && (
        <Header />
      )}

      {/* Global Keyboard Command Palette (Ctrl+K) */}
      <CommandPalette />

      {/* React Router Routes */}
      <div className="flex-1">
        <Routes>
          {/* Ecosystem Role Authentication Flow */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/customer/login" element={<CustomerLoginPage />} />

          {/* Customer Onboarding & Authentication Flow */}
          <Route path="/scan" element={<QRScannerPage />} />
          <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="/verify-otp" element={<CustomerOTPPage />} />
          <Route path="/dashboard" element={<CustomerDashboardPage />} />
          <Route path="/register" element={<RegistrationPage />} />

          {/* Super Admin Authentication Flow */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/verify-otp" element={<AdminOTPPage />} />

          {/* Customer App Routes */}
          <Route path="/customer/scan" element={<QRScannerPage />} />
          <Route path="/customer/menu" element={<CustomerApp />} />
          <Route path="/customer/cart" element={<CustomerApp />} />
          <Route path="/customer/checkout" element={<CustomerApp />} />
          <Route path="/customer/order-success" element={<CustomerApp />} />
          <Route path="/customer/orders" element={<CustomerApp />} />
          <Route path="/customer/orders/:id" element={<CustomerApp />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />
          <Route path="/customer" element={<CustomerApp />} />

          {/* Restaurant Routes */}
          <Route path="/restaurant/orders" element={<RestaurantPanel initialTab="orders" />} />
          <Route path="/restaurant/menu" element={<RestaurantPanel initialTab="menu" />} />
          <Route path="/restaurant/availability" element={<RestaurantPanel initialTab="menu" />} />
          <Route path="/restaurant/analytics" element={<RestaurantPanel initialTab="analytics" />} />
          <Route path="/restaurant/wallet" element={<RestaurantPanel initialTab="wallet" />} />
          <Route path="/restaurant" element={<RestaurantPanel initialTab="orders" />} />

          {/* Driver Routes */}
          <Route path="/driver/route" element={<DriverApp initialTab="map" />} />
          <Route path="/driver/orders" element={<DriverApp initialTab="orders" />} />
          <Route path="/driver/orders/:id" element={<DriverApp initialTab="orders" />} />
          <Route path="/driver/wallet" element={<DriverApp initialTab="wallet" />} />
          <Route path="/driver" element={<DriverApp initialTab="orders" />} />

          {/* Support Routes */}
          <Route path="/support/orders" element={<SupportPanel initialTab="orders" />} />
          <Route path="/support/tickets" element={<SupportPanel initialTab="tickets" />} />
          <Route path="/support/refunds" element={<SupportPanel initialTab="refunds" />} />
          <Route path="/support" element={<SupportPanel initialTab="tickets" />} />

          {/* Admin Workspace Routes */}
          <Route path="/admin/dashboard" element={<SuperAdminPanel initialTab="dashboard" />} />
          <Route path="/admin/qr-management" element={<QRManagement />} />
          <Route path="/admin/operations" element={<SuperAdminPanel initialTab="operations" />} />
          <Route path="/admin/analytics" element={<SuperAdminPanel initialTab="analytics" />} />
          <Route path="/admin/approvals" element={<SuperAdminPanel initialTab="approvals" />} />
          <Route path="/admin/users" element={<SuperAdminPanel initialTab="users" />} />
          <Route path="/admin/financials" element={<SuperAdminPanel initialTab="financials" />} />
          <Route path="/admin/reports" element={<SuperAdminPanel initialTab="reports" />} />
          <Route path="/admin/security" element={<SuperAdminPanel initialTab="security" />} />
          <Route path="/admin/settings" element={<SuperAdminPanel initialTab="settings" />} />
          <Route path="/admin" element={<SuperAdminPanel initialTab="dashboard" />} />

          {/* Root Fallback Redirect to /scan */}
          <Route path="/" element={<Navigate to="/scan" replace />} />
          <Route path="*" element={<Navigate to="/scan" replace />} />
        </Routes>
      </div>

      {/* Global Toast Component */}
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
