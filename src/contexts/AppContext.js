import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // You can add other application-wide state here
  const [theme, setTheme] = useState('light');
  const [preferences, setPreferences] = useState({});
  
  const value = {
    currentStep,
    setCurrentStep,
    theme,
    setTheme,
    preferences,
    setPreferences
    // Add other app-wide state and functions here
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
