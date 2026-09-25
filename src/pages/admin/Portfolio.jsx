// src/pages/admin/Portfolio.jsx

import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../../services/api';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'solutions',
    categoryLabel: { ar: '', en: '' },
    description: { ar: '', en: '' },
    gradient: 'from-indigo-500 to-purple-600',
    icon: '💼',
    image: '',
    order: 0,
    isActive: true,
  });

  const categories = [
    { key: 'solutions', label: 'حلول تقنية' },
    { key: 'apps', label: 'تطبيقات' },
    { key: 'infrastructure', label: 'بنية تحتية' },
    { key: 'web', label: 'تطوير ويب' },
    { key: 'ecommerce', label: 'تجارة إلكترونية' },
  ];

  const gradients = [
    'from-indigo-500 to-purple-600',
    'from-blue-500 to-indigo-700',
    'from-purple-500 to-fuchsia-700',
    'from-red-500 to-rose-700',
    'from-emerald-500 to-teal-700',
    'from-orange-500 to-red-600',
    'from-cyan-500 to-blue-700',
    'from-pink-500 to-rose-600',
  ];

  // جلب المشاريع
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await portfolioAPI.getAll();
      setProjects(response.data.data || []);
    } catch (err) {
      setError('فشل تحميل المشاريع');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // فتح Modal (إضافة)
  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      category: 'solutions',
      categoryLabel: { ar: '', en: '' },
      description: { ar: '', en: '' },
      gradient: 'from-indigo-500 to-purple-600',
      icon: '💼',
      image: '',
      order: projects.length,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  // فتح Modal (تعديل)
  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      categoryLabel: project.categoryLabel || { ar: '', en: '' },
      description: project.description || { ar: '', en: '' },
      gradient: project.gradient || 'from-indigo-500 to-purple-600',
      icon: project.icon || '💼',
      image: project.image || '',
      order: project.order,
      isActive: project.isActive,
    });
    setIsModalOpen(true);
  };

  // حفظ
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingProject) {
        await portfolioAPI.update(editingProject._id, formData);
        setSuccess('✅ تم التعديل بنجاح');
      } else {
        await portfolioAPI.create(formData);
        setSuccess('✅ تم الإضافة بنجاح');
      }

      setIsModalOpen(false);
      fetchProjects();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ');
    }
  };

  // حذف
  const handleDelete = async (id, title) => {
    if (!window.confirm(`هل أنت متأكد من حذف "${title}"؟`)) return;

    try {
      await portfolioAPI.delete(id);
      setSuccess('✅ تم الحذف بنجاح');
      fetchProjects();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('فشل الحذف');
    }
  };

  // تغيير الحقول
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // تغيير الحقول المتعددة اللغات
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
            💼 إدارة المشاريع
          </h1>
          <p className="text-gray-600 mt-1">
            {projects.length} مشروع في قاعدة البيانات
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-indigo-500 hover:to-purple-500 transition shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <span>➕</span>
          <span>إضافة مشروع</span>
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

      {/* الشبكة */}
      {loading ? (
        <div className="p-12 text-center">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">لا يوجد مشاريع</h3>
          <p className="text-gray-600 mb-6">ابدأ بإضافة أول مشروع</p>
          <button
            onClick={openAddModal}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
          >
            ➕ إضافة مشروع
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300"
            >
              {/* الرأس */}
              <div className={`relative h-32 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                <span className="text-5xl">{project.icon}</span>
                <div className="absolute top-3 end-3 px-2 py-1 rounded-full bg-white/95 text-xs font-bold text-gray-800">
                  {project.categoryLabel?.ar || project.category}
                </div>
              </div>

              {/* المحتوى */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  ترتيب: {project.order} · {project.isActive ? '✅ نشط' : '⏸️ معطل'}
                </p>

                {/* الأزرار */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(project)}
                    className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg font-bold text-sm hover:bg-blue-100 transition"
                  >
                    ✏️ تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(project._id, project.title)}
                    className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg font-bold text-sm hover:bg-red-100 transition"
                  >
                    🗑️ حذف
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">
                {editingProject ? '✏️ تعديل مشروع' : '➕ إضافة مشروع جديد'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  عنوان المشروع (عربي) *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    الفئة
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  >
                    {categories.map((cat) => (
                      <option key={cat.key} value={cat.key}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    الأيقونة (Emoji)
                  </label>
                  <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition text-center text-2xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  الفئة (عربي)
                </label>
                <input
                  type="text"
                  value={formData.categoryLabel.ar}
                  onChange={(e) => handleNestedChange('categoryLabel', 'ar', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="حلول تقنية"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  الفئة (إنجليزي)
                </label>
                <input
                  type="text"
                  value={formData.categoryLabel.en}
                  onChange={(e) => handleNestedChange('categoryLabel', 'en', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="Tech Solutions"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  الوصف (عربي)
                </label>
                <textarea
                  value={formData.description.ar}
                  onChange={(e) => handleNestedChange('description', 'ar', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  الوصف (إنجليزي)
                </label>
                <textarea
                  value={formData.description.en}
                  onChange={(e) => handleNestedChange('description', 'en', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  التدرج اللوني
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {gradients.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({ ...formData, gradient: g })}
                      className={`h-12 rounded-xl bg-gradient-to-br ${g} border-2 transition ${
                        formData.gradient === g ? 'border-gray-900 scale-105' : 'border-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  رابط الصورة (اختياري)
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="/images/portfolio/project.jpg"
                  dir="ltr"
                />
              </div>

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

              {/* Modal Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-indigo-500 hover:to-purple-500 transition shadow-lg"
                >
                  {editingProject ? '💾 حفظ التعديلات' : '➕ إضافة'}
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

export default Portfolio;