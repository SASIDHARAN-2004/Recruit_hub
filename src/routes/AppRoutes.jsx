import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/landing/LandingPage";

import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";

import CandidateRegister from "../pages/candidate/CandidateRegister";
import CandidateLogin from "../pages/candidate/CandidateLogin";
import CandidateDashboard from "../pages/candidate/CandidateDashboard";

import EmployerRegister from "../pages/employer/EmployerRegister";
import EmployerLogin from "../pages/employer/EmployerLogin";
import EmployerDashboard from "../pages/employer/EmployerDashboard";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      //landing page

      <Route path="/" element={<LandingPage />} />

      // Admin 

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      // Candidate 

      <Route path="/candidate/register" element={<CandidateRegister />} />
      <Route path="/candidate/login" element={<CandidateLogin />} />
      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute role="candidate">
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />

      // Compenies 
      
      <Route path="/employer/register" element={<EmployerRegister />} />
      <Route path="/employer/login" element={<EmployerLogin />} />
      <Route
        path="/employer/dashboard"
        element={
          <ProtectedRoute role="employer">
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}

export default AppRoutes;
