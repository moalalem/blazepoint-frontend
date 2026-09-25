// src/pages/admin/Messages.jsx

import React, { useState, useEffect } from 'react';
import { contactAPI } from '../../services/api';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);

  // الفلاتر
  const filters = [
    { key: 'all', label: 'الكل', icon: '📬' },
    { key: 'new', label: 'جديدة', icon: '🔔' },
    { key: 'read', label: 'مقروءة', icon: '👁️' },
    { key: 'replied', label: 'تم الرد', icon: '✅' },
    { key: 'archived', label: 'مؤرشفة', icon: '📦' },
  ];

  // جلب الرسائل
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await contactAPI.getAll();
      const data = response.data.data || [];
      setMessages(data);
    } catch (err) {
      setError('فشل تحميل الرسائل');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // تصفية حسب الفلتر
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredMessages(messages);
    } else {
      setFilteredMessages(messages.filter((m) => m.status === activeFilter));
    }
  }, [activeFilter, messages]);

  // إحصائيات سريعة
  const getStats = () => {
    return {
      total: messages.length,
      new: messages.filter((m) => m.status === 'new').length,
      read: messages.filter((m) => m.status === 'read').length,
      replied: messages.filter((m) => m.status === 'replied').length,
    };
  };

  const stats = getStats();

  // فتح رسالة (تحديث تلقائي لـ read)
  const openMessage = async (message) => {
    setSelectedMessage(message);

    // إذا كانت جديدة → حدّث الحالة إلى "read"
    if (message.status === 'new') {
      try {
        await contactAPI.update(message._id, { status: 'read' });
        fetchMessages();
      } catch (err) {
        console.error('Failed to update status:', err);
      }
    }
  };

  // تغيير الحالة
  const changeStatus = async (id, status) => {
    try {
      await contactAPI.update(id, { status });
      setSuccess(`✅ تم تحديث الحالة إلى: ${getStatusLabel(status)}`);
      fetchMessages();

      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('فشل تحديث الحالة');
    }
  };

  // حذف
  const handleDelete = async (id, name) => {
    if (!window.confirm(`هل أنت متأكد من حذف رسالة "${name}"؟`)) return;

    try {
      await contactAPI.delete(id);
      setSuccess('✅ تم الحذف بنجاح');
      setSelectedMessage(null);
      fetchMessages();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('فشل الحذف');
    }
  };

  // Helper functions
  const getStatusLabel = (status) => {
    const labels = {
      new: 'جديدة',
      read: 'مقروءة',
      replied: 'تم الرد',
      archived: 'مؤرشفة',
    };
    return labels[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-700',
      read: 'bg-gray-100 text-gray-700',
      replied: 'bg-green-100 text-green-700',
      archived: 'bg-purple-100 text-purple-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          ✉️ الرسائل الواردة
        </h1>
        <p className="text-gray-600 mt-1">
          إدارة رسائل العملاء من نموذج التواصل
        </p>
      </div>

      {/* إحصائيات */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="text-3xl mb-2">📬</div>
          <div className="text-2xl font-extrabold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-500 font-medium">إجمالي الرسائل</div>
        </div>
        <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
          <div className="text-3xl mb-2">🔔</div>
          <div className="text-2xl font-extrabold text-blue-600">{stats.new}</div>
          <div className="text-xs text-blue-600 font-medium">جديدة</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="text-3xl mb-2">👁️</div>
          <div className="text-2xl font-extrabold text-gray-900">{stats.read}</div>
          <div className="text-xs text-gray-500 font-medium">مقروءة</div>
        </div>
        <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-2xl font-extrabold text-green-600">{stats.replied}</div>
          <div className="text-xs text-green-600 font-medium">تم الرد</div>
        </div>
      </div>

      {/* رسائل */}
      {success && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700">
          {success}
        </div>
      )}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* الفلاتر */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
              activeFilter === filter.key
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300'
            }`}
          >
            <span>{filter.icon}</span>
            <span>{filter.label}</span>
          </button>
        ))}
      </div>

      {/* القائمة + التفاصيل */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* قائمة الرسائل */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden max-h-[600px] overflow-y-auto">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-gray-600 text-sm">لا يوجد رسائل</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredMessages.map((message) => (
                <button
                  key={message._id}
                  onClick={() => openMessage(message)}
                  className={`w-full text-right p-4 hover:bg-gray-50 transition ${
                    selectedMessage?._id === message._id ? 'bg-indigo-50 border-r-4 border-indigo-600' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-gray-900 text-sm">
                      {message.name}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${getStatusColor(message.status)}`}>
                      {getStatusLabel(message.status)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-2 truncate">
                    {message.subject || 'بدون موضوع'}
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatDate(message.createdAt)}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* تفاصيل الرسالة */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          {!selectedMessage ? (
            <div className="p-12 text-center h-full flex flex-col items-center justify-center">
              <div className="text-6xl mb-4">📧</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                اختر رسالة لعرضها
              </h3>
              <p className="text-gray-600 text-sm">
                انقر على أي رسالة من القائمة لعرض تفاصيلها
              </p>
            </div>
          ) : (
            <div className="h-full flex flex-col">

              {/* رأس الرسالة */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                      {selectedMessage.subject || 'بدون موضوع'}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {formatDate(selectedMessage.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                  >
                    ✕
                  </button>
                </div>

                {/* معلومات المرسل */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-gray-50 rounded-xl p-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">الاسم</div>
                    <div className="font-bold text-gray-900 text-sm">
                      {selectedMessage.name}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">البريد</div>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="font-bold text-indigo-600 text-sm hover:underline"
                      dir="ltr"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">الهاتف</div>
                    <a
                      href={`tel:${selectedMessage.phone}`}
                      className="font-bold text-indigo-600 text-sm hover:underline"
                      dir="ltr"
                    >
                      {selectedMessage.phone || '—'}
                    </a>
                  </div>
                </div>
              </div>

              {/* نص الرسالة */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* أزرار الحالة */}
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="mb-3 text-xs font-bold text-gray-600">
                  تغيير الحالة:
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['new', 'read', 'replied', 'archived'].map((status) => (
                    <button
                      key={status}
                      onClick={() => changeStatus(selectedMessage._id, status)}
                      disabled={selectedMessage.status === status}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                        selectedMessage.status === status
                          ? 'bg-indigo-600 text-white cursor-default'
                          : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-400 hover:text-indigo-600'
                      }`}
                    >
                      {getStatusLabel(status)}
                    </button>
                  ))}
                </div>

                {/* أزرار الإجراءات */}
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=رد: ${selectedMessage.subject || ''}`}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl font-bold text-sm hover:from-indigo-500 hover:to-purple-500 transition shadow-lg"
                  >
                    📧 الرد عبر البريد
                  </a>
                  <a
                    href={`https://wa.me/${selectedMessage.phone?.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-[#128C7E] transition shadow-lg"
                  >
                    💬 واتساب
                  </a>
                  <button
                    onClick={() => handleDelete(selectedMessage._id, selectedMessage.name)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-50 text-red-600 px-5 py-3 rounded-xl font-bold text-sm hover:bg-red-100 transition"
                  >
                    🗑️ حذف
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default Messages;