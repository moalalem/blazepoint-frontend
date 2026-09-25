// src/main.jsx

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, useLocation } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import './i18n';

// ============================================
// 🌐 TawkController — إخفاء/إظهار Tawk.to حسب الصفحة
// ============================================
function TawkController() {
  const location = useLocation();

  useEffect(() => {
    // ننتظر حتى يُحمَّل Tawk.to
    const checkTawk = setInterval(() => {
      if (window.Tawk_API && window.Tawk_API.hideWidget && window.Tawk_API.showWidget) {
        clearInterval(checkTawk);

        const isAdminPage = location.pathname.startsWith('/admin');

        if (isAdminPage) {
          window.Tawk_API.hideWidget();
        } else {
          window.Tawk_API.showWidget();
        }
      }
    }, 300);

    // تنظيف المؤقت
    return () => clearInterval(checkTawk);
  }, [location.pathname]);

  return null;
}

// ============================================
// 🚀 نقطة البداية
// ============================================
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <TawkController />
          <App />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);