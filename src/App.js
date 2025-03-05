import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
//import Layout from './components/layout/Layout';
import IntroStep from './components/steps/IntroStep';
import StylistStep from './components/steps/StylistStep';
// Import other components as needed

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
            <Routes>
              <Route path="/" element={<IntroStep />} />
              <Route path="/stylist" element={<StylistStep />} />
              {/* Add other routes as needed */}
            </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
