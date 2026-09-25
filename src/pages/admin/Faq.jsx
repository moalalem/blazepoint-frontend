// src/pages/admin/Faq.jsx

import React, { useState, useEffect } from 'react';
import { faqAPI } from '../../services/api';

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  const [formData, setFormData] = useState({
    question: { ar: '', en: '' },
    answer: { ar: '', en: '' },
    order: 0,
    isActive: true,
  });

  // جلب الأسئلة
  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const response = await faqAPI.getAll();
      setFaqs(response.data.data || []);
    } catch (err) {
      setError('فشل تحميل الأسئلة');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  // فتح Modal (إضافة)
  const openAddModal = () => {
    setEditingFaq(null);
    setFormData({
      question: { ar: '', en: '' },
      answer: { ar: '', en: '' },
      order: faqs.length,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  // فتح Modal (تعديل)
  const openEditModal = (faq) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question || { ar: '', en: '' },
      answer: faq.answer || { ar: '', en: '' },
      order: faq.order,
      isActive: faq.isActive,
    });
    setIsModalOpen(true);
  };

  // حفظ
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingFaq) {
        await faqAPI.update(editingFaq._id, formData);
        setSuccess('✅ تم التعديل بنجاح');
      } else {
        await faqAPI.create(formData);
        setSuccess('✅ تم الإضافة بنجاح');
      }

      setIsModalOpen(false);
      fetchFaqs();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ');
    }
  };

  // حذف
  const handleDelete = async (id, question) => {
    if (!window.confirm(`هل أنت متأكد من حذف "${question}"؟`)) return;

    try {
      await faqAPI.delete(id);
      setSuccess('✅ تم الحذف بنجاح');
      fetchFaqs();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('فشل الحذف');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleNestedChange = (field, lang, value) => {
    setFormData({
      ...formData,
      [field]: {
        ...formData[field],
        [lang]: value,
      },
    });
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            ❓ إدارة الأسئلة الشائعة
          </h1>
          <p className="text-gray-600 mt-1">
            {faqs.length} سؤال في قاعدة البيانات
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-indigo-500 hover:to-purple-500 transition shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <span>➕</span>
          <span>إضافة سؤال</span>
        </button>
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

      {/* القائمة */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-gray-600">جاري التحميل...</p>
          </div>
        ) : faqs.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">لا يوجد أسئلة</h3>
            <p className="text-gray-600 mb-6">ابدأ بإضافة أول سؤال</p>
            <button
              onClick={openAddModal}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
            >
              ➕ إضافة سؤال
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {faqs.map((faq) => (
              <div
                key={faq._id}
                className="p-6 hover:bg-gray-50 transition"
              >
                <div className="flex items-start justify-between gap-4">

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm">
                        {faq.order}
                      </span>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {faq.question?.ar}
                      </h3>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                      {faq.answer?.ar}
                    </p>

                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                        faq.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {faq.isActive ? '✅ نشط' : '⏸️ معطل'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => openEditModal(faq)}
                      className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition"
                      title="تعديل"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(faq._id, faq.question?.ar)}
                      className="w-10 h-10 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition"
                      title="حذف"
                    >
                      🗑️
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">
                {editingFaq ? '✏️ تعديل سؤال' : '➕ إضافة سؤال جديد'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">

              {/* Question */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  السؤال (عربي) *
                </label>
                <input
                  type="text"
                  value={formData.question.ar}
                  onChange={(e) => handleNestedChange('question', 'ar', e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  السؤال (إنجليزي) *
                </label>
                <input
                  type="text"
                  value={formData.question.en}
                  onChange={(e) => handleNestedChange('question', 'en', e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  dir="ltr"
                />
              </div>

              {/* Answer */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  الإجابة (عربي) *
                </label>
                <textarea
                  value={formData.answer.ar}
                  onChange={(e) => handleNestedChange('answer', 'ar', e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  الإجابة (إنجليزي) *
                </label>
                <textarea
                  value={formData.answer.en}
                  onChange={(e) => handleNestedChange('answer', 'en', e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none"
                  dir="ltr"
                />
              </div>

              {/* Order + Active */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    الترتيب
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  />
                </div>

                <div className="flex items-end pb-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                      className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-bold text-gray-700">نشط</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-indigo-500 hover:to-purple-500 transition shadow-lg"
                >
                  {editingFaq ? '💾 حفظ التعديلات' : '➕ إضافة'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition"
                >
                  إلغاء
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Faq;