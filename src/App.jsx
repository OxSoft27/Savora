import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import PublicLayout from './components/Layout/PublicLayout';
import Dashboard from './pages/Dashboard';
import Reservations from './pages/Reservations';
import Tables from './pages/Tables';
import Booking from './pages/public/Booking';
import BookingSuccess from './pages/public/BookingSuccess';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/book" element={<Booking />} />
          <Route path="/book/success" element={<BookingSuccess />} />
        </Route>

        {/* Root Redirect to Customer Portal */}
        <Route path="/" element={<Navigate to="/book" replace />} />

        {/* Admin Routes - Separated Access */}
        <Route path="/admin" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="tables" element={<Tables />} />
          <Route path="analytics" element={<div className="p-8 text-center text-[var(--color-text-muted)]">Analytics Feature Coming Soon</div>} />
          <Route path="settings" element={<div className="p-8 text-center text-[var(--color-text-muted)]">Settings Feature Coming Soon</div>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/book" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
