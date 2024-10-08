

// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/Login';
// import Home from './components/Home';
// import Dashboard from './components/Dashboard';
// import AdminDashboard from './components/AdminDashboard';
// import EventDetails from './components/EventDetails';
// import Logout from './components/Logout';
// import axios from 'axios';

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     // Check if the user is authenticated
//     const checkAuth = async () => {
//       try {
//         const response = await axios.get('/api/auth/check');
//         setIsAuthenticated(response.data.isAuthenticated);
//         setIsAdmin(response.data.isAdmin);
//       } catch (error) {
//         setIsAuthenticated(false);
//         setIsAdmin(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/event-details" element={<EventDetails />} />
//           <Route 
//             path="/admin-dashboard" 
//             element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} 
//           />
//           <Route 
//             path="/dashboard" 
//             element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
//           />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/logout" element={<Logout />} />
//           <Route path="/" element={<Home />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import EventDetails from './components/EventDetails';
import NavBar from './components/NavBar';
import { AuthProvider, useAuth } from './auth/AuthContext';
import ProtectedComponent from './components/ProtectedComponent';
import LoginStatus from './components/LoginStatus';
import Weather from './components/Weather';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './components/AdminDashboard';
import About from './components/About';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import CreateEvent from './components/CreateEvent';
import Messages from './components/Messages';
import SubDashboard from './components/SubDashboard';
import SubmitEvent from './components/SubmitEvent'

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <LoginStatus />
        <Routes>
          <Route path="/" element={<EventDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/weather/:zipCode" element={<Weather />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/submit-event" element={<SubmitEvent />} />
          <Route path="/subdashboard" element={<SubDashboard />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
