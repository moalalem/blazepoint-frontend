// src/pages/admin/Blog.jsx

import React, { useState, useEffect } from 'react';
import { blogAPI } from '../../services/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const [formData, setFormData] = useState({
    slug: '',
    category: 'ai',
    categoryLabel: { ar: '', en: '' },
    title: { ar: '', en: '' },
    excerpt: { ar: '', en: '' },
    content: { ar: '', en: '' },
    image: '',
    author: { ar: 'فريق BlazePoint', en: 'BlazePoint Team' },
    readTime: { ar: '5 دقائق', en: '5 min read' },
    date: new Date().toISOString().split('T')[0],
    isPublished: true,
  });

  const categories = [
    { key: 'ai', label: 'الذكاء الاصطناعي' },
    { key: 'security', label: 'الأمن السيبراني' },
    { key: 'transformation', label: 'التحول الرقمي' },
    { key: 'design', label: 'تصميم المواقع' },
    { key: 'marketing', label: 'التسويق الرقمي' },
  ];

  // جلب المقالات
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getAll();
      setPosts(response.data.data || []);
    } catch (err) {
      setError('فشل تحميل المقالات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // توليد slug تلقائي
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // فتح Modal (إضافة)
  const openAddModal = () => {
    setEditingPost(null);
    setFormData({
      slug: '',
      category: 'ai',
      categoryLabel: { ar: '', en: '' },
      title: { ar: '', en: '' },
      excerpt: { ar: '', en: '' },
      content: { ar: '', en: '' },
      image: '',
      author: { ar: 'فريق BlazePoint', en: 'BlazePoint Team' },
      readTime: { ar: '5 دقائق', en: '5 min read' },
      date: new Date().toISOString().split('T')[0],
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  // فتح Modal (تعديل)
  const openEditModal = (post) => {
    setEditingPost(post);
    setFormData({
      slug: post.slug,
      category: post.category,
      categoryLabel: post.categoryLabel || { ar: '', en: '' },
      title: post.title || { ar: '', en: '' },
      excerpt: post.excerpt || { ar: '', en: '' },
      content: post.content || { ar: '', en: '' },
      image: post.image || '',
      author: post.author || { ar: 'فريق BlazePoint', en: 'BlazePoint Team' },
      readTime: post.readTime || { ar: '5 دقائق', en: '5 min read' },
      date: post.date ? post.date.split('T')[0] : new Date().toISOString().split('T')[0],
      isPublished: post.isPublished,
    });
    setIsModalOpen(true);
  };

  // حفظ
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingPost) {
        await blogAPI.update(editingPost._id, formData);
        setSuccess('✅ تم التعديل بنجاح');
      } else {
        await blogAPI.create(formData);
        setSuccess('✅ تم الإضافة بنجاح');
      }

      setIsModalOpen(false);
      fetchPosts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ');
    }
  };

  // حذف
  const handleDelete = async (id, title) => {
    if (!window.confirm(`هل أنت متأكد من حذف "${title}"؟`)) return;

    try {
      await blogAPI.delete(id);
      setSuccess('✅ تم الحذف بنجاح');
      fetchPosts();
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
            📰 إدارة المقالات
          </h1>
          <p className="text-gray-600 mt-1">
            {posts.length} مقال في قاعدة البيانات
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-indigo-500 hover:to-purple-500 transition shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <span>➕</span>
          <span>إضافة مقال</span>
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
      {loading ? (
        <div className="p-12 text-center">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">لا يوجد مقالات</h3>
          <p className="text-gray-600 mb-6">ابدأ بإضافة أول مقال</p>
          <button
            onClick={openAddModal}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
          >
            ➕ إضافة مقال
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300"
            >
              {/* الصورة */}
              <div className="relative h-40 overflow-hidden bg-gray-100">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title?.ar}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl">
                    📰
                  </div>
                )}
                <div className="absolute top-3 end-3 px-2 py-1 rounded-full bg-white/95 text-xs font-bold text-gray-800">
                  {post.categoryLabel?.ar || post.category}
                </div>
              </div>

              {/* المحتوى */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                  {post.title?.ar}
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  {post.isPublished ? '✅ منشور' : '⏸️ مسودة'} · {new Date(post.date).toLocaleDateString('ar-SA')}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(post)}
                    className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg font-bold text-sm hover:bg-blue-100 transition"
                  >
                    ✏️ تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(post._id, post.title?.ar)}
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">
                {editingPost ? '✏️ تعديل مقال' : '➕ إضافة مقال جديد'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">

              {/* العنوان */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    العنوان (عربي) *
                  </label>
                  <input
                    type="text"
                    value={formData.title.ar}
                    onChange={(e) => handleNestedChange('title', 'ar', e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    العنوان (إنجليزي) *
                  </label>
                  <input
                    type="text"
                    value={formData.title.en}
                    onChange={(e) => handleNestedChange('title', 'en', e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Slug + Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Slug (رابط URL) *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      required
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                      placeholder="ai-transformation"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, slug: generateSlug(formData.title.en || 'post') })}
                      className="px-3 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition"
                      title="توليد من العنوان الإنجليزي"
                    >
                      🎲
                    </button>
                  </div>
                </div>

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
              </div>

              {/* Category Label */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    اسم الفئة (عربي)
                  </label>
                  <input
                    type="text"
                    value={formData.categoryLabel.ar}
                    onChange={(e) => handleNestedChange('categoryLabel', 'ar', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    اسم الفئة (إنجليزي)
                  </label>
                  <input
                    type="text"
                    value={formData.categoryLabel.en}
                    onChange={(e) => handleNestedChange('categoryLabel', 'en', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    الوصف المختصر (عربي)
                  </label>
                  <textarea
                    value={formData.excerpt.ar}
                    onChange={(e) => handleNestedChange('excerpt', 'ar', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    الوصف المختصر (إنجليزي)
                  </label>
                  <textarea
                    value={formData.excerpt.en}
                    onChange={(e) => handleNestedChange('excerpt', 'en', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  محتوى المقال (عربي) - HTML مدعوم
                </label>
                <textarea
                  value={formData.content.ar}
                  onChange={(e) => handleNestedChange('content', 'ar', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none font-mono text-sm"
                  placeholder="<p>محتوى المقال...</p>"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  محتوى المقال (إنجليزي) - HTML مدعوم
                </label>
                <textarea
                  value={formData.content.en}
                  onChange={(e) => handleNestedChange('content', 'en', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none font-mono text-sm"
                  placeholder="<p>Article content...</p>"
                  dir="ltr"
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  رابط الصورة
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="https://images.unsplash.com/..."
                  dir="ltr"
                />
              </div>

              {/* Date + Read Time + Published */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    التاريخ
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    وقت القراءة (عربي)
                  </label>
                  <input
                    type="text"
                    value={formData.readTime.ar}
                    onChange={(e) => handleNestedChange('readTime', 'ar', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                    placeholder="5 دقائق"
                  />
                </div>

                <div className="flex items-end pb-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isPublished"
                      checked={formData.isPublished}
                      onChange={handleChange}
                      className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-bold text-gray-700">منشور</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-indigo-500 hover:to-purple-500 transition shadow-lg"
                >
                  {editingPost ? '💾 حفظ التعديلات' : '➕ إضافة'}
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

export default Blog;