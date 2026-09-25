// src/pages/admin/AdminLayout.jsx

import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // روابط القائمة الجانبية
  const menuItems = [
    { path: '/admin/dashboard', label: 'لوحة التحكم', icon: '📊' },
    { path: '/admin/partners', label: 'الشركاء', icon: '🤝' },
    { path: '/admin/portfolio', label: 'المشاريع', icon: '💼' },
    { path: '/admin/blog', label: 'المدونة', icon: '📰' },
    { path: '/admin/faq', label: 'الأسئلة', icon: '❓' },
    { path: '/admin/messages', label: 'الرسائل', icon: '✉️' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    if (window.confirm('هل أنت متأكد من تسجيل الخروج؟')) {
      logout();
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50" dir="rtl">

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 start-0 bg-gradient-to-b from-indigo-950 to-purple-950 text-white transition-all duration-300 z-40 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >

        {/* الشعار */}
        <div className="flex items-center justify-between h-20 px-4 border-b border-white/10">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl">
              🔷
            </div>
            {isSidebarOpen && (
              <div className="text-sm font-bold">BlazePoint</div>
            )}
          </Link>
        </div>

        {/* القائمة */}
        <nav className="p-4 space-y-2">

          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-white/15 text-white font-bold'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isSidebarOpen && <span className="text-sm">{item.label}</span>}
            </Link>
          ))}

        </nav>

        {/* زر تسجيل الخروج */}
        <div className="absolute bottom-0 start-0 end-0 p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all duration-200"
          >
            <span className="text-xl">🚪</span>
            {isSidebarOpen && <span className="text-sm">تسجيل خروج</span>}
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ms-64' : 'ms-20'
        }`}
      >

        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between h-20 px-6">

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-indigo-100 flex items-center justify-center transition"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <h1 className="text-lg font-bold text-gray-900">
                لوحة التحكم
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/"
                target="_blank"
                className="hidden md:flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition"
              >
                <span>🌐</span>
                عرض الموقع
              </Link>

              <div className="flex items-center gap-2 bg-indigo-50 px-3 py-2 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                  {admin?.name?.[0] || 'A'}
                </div>
                <span className="text-sm font-bold text-gray-800">
                  {admin?.name || 'Admin'}
                </span>
              </div>
            </div>

          </div>
        </header>

        {/* المحتوى */}
        <main className="p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;