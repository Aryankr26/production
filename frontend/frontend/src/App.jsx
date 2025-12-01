import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Live from './pages/Live';
import Fuel from './pages/Fuel';
import Tyres from './pages/Tyres';
import Documents from './pages/Documents';
import Geofencing from './pages/Geofencing';
import Complaints from './pages/Complaints';
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';
import { useAuthStore } from './stores/auth';

function RequireAuth({ children }) {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />} >
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/" element={<RequireAuth><AppLayout /></RequireAuth>}>
        <Route index element={<Dashboard />} />
        <Route path="live" element={<Live />} />
        <Route path="fuel" element={<Fuel />} />
        <Route path="tyres" element={<Tyres />} />
        <Route path="documents" element={<Documents />} />
        <Route path="geofencing" element={<Geofencing />} />
        <Route path="complaints" element={<Complaints />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}