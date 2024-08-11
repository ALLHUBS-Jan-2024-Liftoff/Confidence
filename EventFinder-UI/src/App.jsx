import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import AdminDashboard from './components/AdminDashboard'
import CreateEvent from './components/CreateEvent'


function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />     
      </Routes>
    </Router>
  );
}

export default App

