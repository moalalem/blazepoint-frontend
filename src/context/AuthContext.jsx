// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // تحميل المستخدم عند بدء التطبيق
  useEffect(() => {
    const loadAdmin = async () => {
      const token = localStorage.getItem('adminToken');
      const savedAdmin = localStorage.getItem('adminData');

      if (token && savedAdmin) {
        try {
          setAdmin(JSON.parse(savedAdmin));
        } catch (err) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminData');
        }
      }

      setLoading(false);
    };

    loadAdmin();
  }, []);

  // تسجيل الدخول
  const login = async (email, password) => {
    try {
      setError(null);
      const response = await authAPI.login({ email, password });
      const { token, ...adminData } = response.data.data;

      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminData', JSON.stringify(adminData));

      setAdmin(adminData);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  // تسجيل الخروج
  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setAdmin(null);
    window.location.href = '/admin/login';
  };

  const value = {
    admin,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!admin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};