// src/pages/admin/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // إذا كان يتحقق من المصادقة → أظهر شاشة تحميل
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="font-bold">جاري التحقق...</p>
        </div>
      </div>
    );
  }

  // إذا لم يسجل دخول → ارجع لصفحة Login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // وإلا → اعرض المحتوى
  return children;
};

export default ProtectedRoute;