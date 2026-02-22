import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StudyNotes from './pages/StudyNotes';
import Flashcards from './pages/Flashcards';
import PracticeTests from './pages/PracticeTests';
import MindMaps from './pages/MindMaps';
import Analytics from './pages/Analytics';
import Discussion from './pages/Discussion';
import Settings from './pages/Settings';

// Simple auth check - in production, use proper auth context/state
const isAuthenticated = () => {
  // TODO: Replace with actual authentication check
  return localStorage.getItem('isAuthenticated') === 'true';
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="notes" element={<StudyNotes />} />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="practice-tests" element={<PracticeTests />} />
          <Route path="mindmaps" element={<MindMaps />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="discussion" element={<Discussion />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
