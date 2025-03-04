import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Home from './pages/Home';
import StylistConsole from './pages/StylistConsole';
import './index.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stylist" element={<StylistConsole />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
