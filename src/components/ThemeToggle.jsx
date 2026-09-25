// src/components/ThemeToggle.jsx

import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div
      className="relative inline-flex items-center gap-1 rounded-full p-1 transition-all duration-500"
      style={{
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 8px 32px rgba(79, 70, 229, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
      }}
    >
      {/* 🌙 زر الوضع الليلي */}
      <button
        onClick={() => !isDark || toggleTheme()}
        className={`relative px-3 py-2 rounded-full transition-all duration-300 flex items-center justify-center ${
          isDark ? 'text-white shadow-lg' : 'text-gray-500 hover:text-indigo-600'
        }`}
        style={
          isDark
            ? {
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                boxShadow: '0 4px 15px rgba(79, 70, 229, 0.5)',
              }
            : {}
        }
        aria-label="Dark mode"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>

      {/* ☀️ زر الوضع النهاري */}
      <button
        onClick={() => isDark || toggleTheme()}
        className={`relative px-3 py-2 rounded-full transition-all duration-300 flex items-center justify-center ${
          !isDark ? 'text-white shadow-lg' : 'text-gray-500 hover:text-amber-400'
        }`}
        style={
          !isDark
            ? {
                background: 'linear-gradient(135deg, #f59e0b 0%, #eab308 100%)',
                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.5)',
              }
            : {}
        }
        aria-label="Light mode"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

    </div>
  );
};

export default ThemeToggle;