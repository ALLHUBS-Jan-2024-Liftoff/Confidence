import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventDetails from './components/EventDetails';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;


