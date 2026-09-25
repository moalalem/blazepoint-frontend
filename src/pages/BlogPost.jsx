// src/pages/BlogPost.jsx

import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { blogAPI } from '../services/api';
import SEO from '../components/SEO';

const BlogPost = () => {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const lang = isRTL ? 'ar' : 'en';

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // جلب المقال
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await blogAPI.getBySlug(slug);
        const postData = response.data.data;
        setPost(postData);

        // جلب مقالات ذات صلة
        const allResponse = await blogAPI.getAll();
        const allPosts = allResponse.data.data || [];
        const related = allPosts
          .filter((p) => p._id !== postData._id && p.category === postData.category)
          .slice(0, 3);

        setRelatedPosts(related);
      } catch (err) {
        console.error('Failed to fetch post:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // حالة التحميل
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">{isRTL ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  // لم يوجد المقال
  if (notFound || !post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="bg-white">
      <SEO
        title={post.title?.[lang]}
        description={post.excerpt?.[lang]}
        keywords={`${post.categoryLabel?.[lang]}, BlazePoint, مدونة`}
        image={post.image}
        url={`https://blazepoint.net/blog/${post.slug}`}
        type="article"
      />

      {/* Hero */}
      <section className="bg-gradient-to-l from-indigo-600 to-purple-700 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/80 mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition">
              {isRTL ? 'الرئيسية' : 'Home'}
            </Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-white transition">
              {isRTL ? 'المدونة' : 'Blog'}
            </Link>
            <span>/</span>
            <span className="text-white">{post.categoryLabel?.[lang]}</span>
          </div>

          {/* شارة التصنيف */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold mb-5">
            {post.categoryLabel?.[lang]}
          </div>

          {/* العنوان */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {post.title?.[lang]}
          </h1>

          {/* معلومات */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/90">
            <span className="flex items-center gap-2">
              <span>✍️</span>
              {post.author?.[lang]}
            </span>
            <span className="flex items-center gap-2">
              <span>📅</span>
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-2">
              <span>⏱️</span>
              {post.readTime?.[lang]}
            </span>
          </div>

        </div>
      </section>

      {/* صورة المقال */}
      {post.image && (
        <section className="px-4 -mt-8 relative z-10">
          <div className="container mx-auto max-w-4xl">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={post.image}
                alt={post.title?.[lang]}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>
      )}

      {/* محتوى المقال */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <article
            className="prose prose-lg prose-indigo max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-ul:my-4 prose-li:text-gray-700
              prose-ol:my-4 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: post.content?.[lang] || '' }}
          />

          {/* زر العودة */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all duration-300"
            >
              <span>{isRTL ? '→' : '←'}</span>
              <span>{isRTL ? 'العودة إلى المدونة' : 'Back to Blog'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* مقالات ذات صلة */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              {isRTL ? 'مقالات ذات صلة' : 'Related Articles'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related._id}
                  to={`/blog/${related.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative h-40 overflow-hidden bg-gray-100">
                    {related.image ? (
                      <img
                        src={related.image}
                        alt={related.title?.[lang]}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        📰
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
                      {related.title?.[lang]}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {formatDate(related.date)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default BlogPost;