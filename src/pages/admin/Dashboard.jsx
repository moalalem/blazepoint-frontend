// src/pages/admin/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { partnersAPI, portfolioAPI, blogAPI, faqAPI, contactAPI } from '../../services/api';

const Dashboard = () => {
  const { admin } = useAuth();
  const [stats, setStats] = useState({
    partners: 0,
    portfolio: 0,
    blog: 0,
    faq: 0,
    messages: 0,
    newMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [partners, portfolio, blog, faq, messages] = await Promise.all([
          partnersAPI.getAll(),
          portfolioAPI.getAll(),
          blogAPI.getAll(),
          faqAPI.getAll(),
          contactAPI.getAll(),
        ]);

        const msgs = messages.data.data || [];
        const newMsgs = msgs.filter((m) => m.status === 'new').length;

        setStats({
          partners: partners.data.count || 0,
          portfolio: portfolio.data.count || 0,
          blog: blog.data.count || 0,
          faq: faq.data.count || 0,
          messages: msgs.length,
          newMessages: newMsgs,
        });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'الشركاء', value: stats.partners, icon: '🤝', color: 'from-indigo-500 to-indigo-700', link: '/admin/partners' },
    { label: 'المشاريع', value: stats.portfolio, icon: '💼', color: 'from-purple-500 to-purple-700', link: '/admin/portfolio' },
    { label: 'مقالات المدونة', value: stats.blog, icon: '📰', color: 'from-blue-500 to-blue-700', link: '/admin/blog' },
    { label: 'الأسئلة الشائعة', value: stats.faq, icon: '❓', color: 'from-emerald-500 to-emerald-700', link: '/admin/faq' },
    { label: 'الرسائل', value: stats.messages, icon: '✉️', color: 'from-orange-500 to-orange-700', link: '/admin/messages' },
  ];

  return (
    <div className="space-y-8">

      {/* الترحيب */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          مرحباً، {admin?.name || 'Admin'} 👋
        </h1>
        <p className="text-white/80">
          أهلاً بك في لوحة تحكم BlazePoint. من هنا يمكنك إدارة محتوى الموقع بالكامل.
        </p>
      </div>

      {/* الإحصائيات */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">نظرة عامة</h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {statCards.map((card, i) => (
              <Link
                key={i}
                to={card.link}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl border border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition`}>
                  {card.icon}
                </div>
                <div className="text-3xl font-extrabold text-gray-900 mb-1">
                  {card.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {card.label}
                </div>
              </Link>
            ))}

            {/* تنبيه الرسائل الجديدة */}
            {stats.newMessages > 0 && (
              <Link
                to="/admin/messages"
                className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-2xl mb-4 animate-pulse">
                  🔔
                </div>
                <div className="text-3xl font-extrabold text-red-600 mb-1">
                  {stats.newMessages}
                </div>
                <div className="text-sm text-red-600 font-bold">
                  رسائل جديدة بحاجة للرد
                </div>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* روابط سريعة */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">إجراءات سريعة</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/partners"
            className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-300 hover:shadow-md transition"
          >
            <span className="text-2xl">➕</span>
            <span className="text-sm font-bold text-gray-800">إضافة شريك</span>
          </Link>

          <Link
            to="/admin/portfolio"
            className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-300 hover:shadow-md transition"
          >
            <span className="text-2xl">➕</span>
            <span className="text-sm font-bold text-gray-800">إضافة مشروع</span>
          </Link>

          <Link
            to="/admin/blog"
            className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-300 hover:shadow-md transition"
          >
            <span className="text-2xl">📝</span>
            <span className="text-sm font-bold text-gray-800">مقال جديد</span>
          </Link>

          <Link
            to="/admin/messages"
            className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-300 hover:shadow-md transition"
          >
            <span className="text-2xl">📬</span>
            <span className="text-sm font-bold text-gray-800">قراءة الرسائل</span>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;