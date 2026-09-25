// src/context/HeroContext.jsx

import React, { createContext, useContext, useState } from 'react';

const HeroContext = createContext();

export const HeroProvider = ({ children }) => {
  const [currentColor, setCurrentColor] = useState(
    'linear-gradient(135deg, #3b82f6, #1d4ed8)'
  );

  return (
    <HeroContext.Provider value={{ currentColor, setCurrentColor }}>
      {children}
    </HeroContext.Provider>
  );
};

export const useHero = () => {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error('useHero must be used within HeroProvider');
  }
  return context;
};