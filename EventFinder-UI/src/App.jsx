import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import EventDetails from './components/EventDetails';
import Logout from './components/Logout';
import axios from 'axios';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/check');
        setIsAuthenticated(response.data.isAuthenticated);
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/event-details" element={<EventDetails />} />
          <Route 
            path="/admin-dashboard" 
            element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
