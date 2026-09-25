// src/pages/BlogPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { blogAPI } from '../services/api';
import SEO from '../components/SEO';

const BlogPage = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const lang = isRTL ? 'ar' : 'en';

  // ============================================
  // State
  // ============================================
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

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
  // الفلاتر
  // ============================================
  const categories = [
    { key: 'all', label: isRTL ? 'الكل' : 'All' },
    { key: 'ai', label: isRTL ? 'الذكاء الاصطناعي' : 'AI' },
    { key: 'security', label: isRTL ? 'الأمن السيبراني' : 'Security' },
    { key: 'transformation', label: isRTL ? 'التحول الرقمي' : 'Transformation' },
    { key: 'design', label: isRTL ? 'تصميم المواقع' : 'Design' },
    { key: 'marketing', label: isRTL ? 'التسويق الرقمي' : 'Marketing' },
  ];

  const filteredPosts =
    activeCategory === 'all'
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white">
      <SEO
        title={isRTL ? 'المدونة' : 'Blog'}
        description={isRTL
          ? 'مقالات تقنية من خبراء BlazePoint حول الذكاء الاصطناعي، الأمن السيبراني، التحول الرقمي، والتسويق.'
          : 'Tech articles from BlazePoint experts on AI, cybersecurity, digital transformation, and marketing.'}
        keywords="مدونة, مقالات تقنية, ذكاء اصطناعي, أمن سيبراني, BlazePoint"
        url="https://blazepoint.net/blog"
      />

      {/* ============================================
          Hero
          ============================================ */}
      <section className="bg-gradient-to-l from-indigo-600 to-purple-700 text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            📰 {isRTL ? 'المدونة' : 'Blog'}
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            {isRTL
              ? 'مقالات ورؤى تقنية من خبراء BlazePoint'
              : 'Tech articles and insights from BlazePoint experts'}
          </p>
        </div>
      </section>

      {/* ============================================
          الفلترة
          ============================================ */}
      <section className="py-12 px-4 border-b border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat.key
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 scale-105'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          المقالات
          ============================================ */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">

          {/* حالة التحميل */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-100 rounded-3xl animate-pulse" />
              ))}
            </div>

          /* حالة الخطأ */
          ) : error ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">⚠️</div>
              <p className="text-gray-500 text-lg">
                {isRTL ? 'تعذر تحميل المقالات' : 'Failed to load articles'}
              </p>
            </div>

          /* حالة عدم وجود مقالات */
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-500 text-lg">
                {isRTL ? 'لا توجد مقالات في هذا التصنيف.' : 'No articles in this category.'}
              </p>
            </div>

          /* عرض المقالات */
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPosts.map((post) => (
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

                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                      {post.title?.[lang]}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt?.[lang]}
                    </p>

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
          )}

        </div>
      </section>

    </div>
  );
};

export default BlogPage;