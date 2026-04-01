import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/templates/DashboardLayout';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import DashboardPage from './components/pages/DashboardPage';
import EmployeesPage from './components/pages/EmployeesPage';
import PayrollPage from './components/pages/PayrollPage';
import LeavePage from './components/pages/LeavePage';
import DepartmentsPage from './components/pages/DepartmentsPage';
import JobRolesPage from './components/pages/JobRolesPage';
import PerformancePage from './components/pages/PerformancePage';
import ReportsPage from './components/pages/ReportsPage';
import { NotificationProvider } from './context/NotificationContext';
import './styles/global.css';

/**
 * Main Application Component
 * 
 * Defines routing and layout for the Employee Management System.
 * Uses Atomic Design structure for components.
 */
const App: React.FC = () => {
  return (
    <NotificationProvider>
      <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Main Dashboard Layout Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/job-roles" element={<JobRolesPage />} />
          <Route path="/leaves" element={<LeavePage />} />
          <Route path="/payroll" element={<PayrollPage />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>

        {/* Home/Redirect Routes */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {/* Wildcard to redirect any broken routes */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
    </NotificationProvider>
  );
};

export default App;
