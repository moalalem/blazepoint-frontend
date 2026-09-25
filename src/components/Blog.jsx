// src/components/Blog.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { blogAPI } from '../services/api';

const Blog = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const lang = isRTL ? 'ar' : 'en';

  // ============================================
  // State
  // ============================================
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============================================
  // جلب المقالات من API
  // ============================================
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await blogAPI.getAll();
        const data = response.data.data || [];

        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // ============================================
  // أول 3 مقالات فقط
  // ============================================
  const featuredPosts = posts.slice(0, 3);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // ============================================
  // حالة التحميل
  // ============================================
  if (loading) {
    return (
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="h-10 w-40 bg-gray-200 rounded-full mx-auto mb-5 animate-pulse" />
            <div className="h-12 w-96 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-64 bg-gray-200 rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ============================================
  // حالة الخطأ
  // ============================================
  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-gray-600">
            {isRTL ? 'تعذر تحميل المقالات' : 'Failed to load articles'}
          </p>
        </div>
      </section>
    );
  }

  // ============================================
  // لا يوجد مقالات
  // ============================================
  if (posts.length === 0) return null;

  // ============================================
  // العرض الرئيسي
  // ============================================
  return (
    <section className="py-20 bg-white relative overflow-hidden">

      {/* خلفيات زخرفية */}
      <div className="absolute top-0 start-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 end-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">

        {/* رأس القسم */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-5">
            <span>📰</span>
            {isRTL ? 'المدونة' : 'Blog'}
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            {isRTL ? (
              <>
                مقالات <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">تقنية</span> من خبرائنا
              </>
            ) : (
              <>
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Tech</span> Articles from Our Experts
              </>
            )}
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            {isRTL
              ? 'اكتشف أحدث المقالات والرؤى حول التقنية، الأمن السيبراني، والتحول الرقمي.'
              : 'Discover the latest articles and insights on tech, cybersecurity, and digital transformation.'}
          </p>
        </div>

        {/* شبكة المقالات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {featuredPosts.map((post) => (
            <Link
              key={post._id}
              to={`/blog/${post.slug}`}
              className="group block bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* الصورة */}
              <div className="relative h-52 overflow-hidden bg-gray-100">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title?.[lang]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    📰
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* شارة التصنيف */}
                <div className="absolute top-4 end-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-xs font-bold text-gray-800 shadow-lg">
                  {post.categoryLabel?.[lang] || post.category}
                </div>
              </div>

              {/* المحتوى */}
              <div className="p-6">

                {/* التاريخ + وقت القراءة */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <span>📅</span>
                    {formatDate(post.date)}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <span>⏱️</span>
                    {post.readTime?.[lang]}
                  </span>
                </div>

                {/* العنوان */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                  {post.title?.[lang]}
                </h3>

                {/* الوصف */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt?.[lang]}
                </p>

                {/* رابط */}
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm group-hover:gap-3 transition-all duration-300">
                  <span>{isRTL ? 'اقرأ المزيد' : 'Read More'}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                    {isRTL ? '←' : '→'}
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* زر عرض كل المقالات */}
        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            {isRTL ? 'عرض جميع المقالات' : 'View All Articles'}
            <span>{isRTL ? '←' : '→'}</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Blog;