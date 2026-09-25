// src/components/Portfolio.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { portfolioAPI } from '../services/api';

const Portfolio = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const lang = isRTL ? 'ar' : 'en';

  // ============================================
  // State
  // ============================================
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // ============================================
  // جلب المشاريع من API
  // ============================================
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await portfolioAPI.getAll();
        const data = response.data.data || [];

        setProjects(data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // ============================================
  // الفلاتر
  // ============================================
  const filters = [
    { key: 'all', label: isRTL ? 'الكل' : 'All' },
    { key: 'solutions', label: isRTL ? 'حلول تقنية' : 'Tech Solutions' },
    { key: 'apps', label: isRTL ? 'تطبيقات' : 'Apps' },
    { key: 'infrastructure', label: isRTL ? 'بنية تحتية' : 'Infrastructure' },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // ============================================
  // عدد البطاقات المرئية حسب حجم الشاشة
  // ============================================
  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 768) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  const maxIndex = Math.max(0, filteredProjects.length - visibleCards);

  // إعادة تعيين الفهرس عند تغيير الفلتر
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter]);

  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
  }, [visibleCards, maxIndex, currentIndex]);

  // ============================================
  // التنقل
  // ============================================
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, maxIndex]);

  // ============================================
  // Swipe
  // ============================================
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      isRTL ? prevSlide() : nextSlide();
    } else if (distance < -50) {
      isRTL ? nextSlide() : prevSlide();
    }
  };

  // ============================================
  // حالة التحميل
  // ============================================
  if (loading) {
    return (
      <section className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="h-10 w-40 bg-gray-200 rounded-full mx-auto mb-5 animate-pulse" />
            <div className="h-12 w-96 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-64 bg-gray-200 rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-80 bg-white rounded-3xl animate-pulse" />
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
      <section className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-gray-600">
            {isRTL ? 'تعذر تحميل المشاريع' : 'Failed to load projects'}
          </p>
        </div>
      </section>
    );
  }

  // ============================================
  // لا يوجد مشاريع
  // ============================================
  if (projects.length === 0) return null;

  // ============================================
  // العرض الرئيسي
  // ============================================
  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden">

      {/* خلفيات زخرفية */}
      <div className="absolute top-0 start-1/4 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 end-1/4 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">

        {/* رأس القسم */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-5">
            <span>💼</span>
            {isRTL ? 'أعمالنا' : 'Our Portfolio'}
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            {isRTL ? (
              <>
                نماذج من <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">مشاريعنا</span> الناجحة
              </>
            ) : (
              <>
                Samples of Our <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Successful Projects</span>
              </>
            )}
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            {isRTL
              ? 'نفتخر بمشاريعنا المتنوعة في مختلف القطاعات، من البنية التحتية إلى التطبيقات والحلول التقنية.'
              : 'We are proud of our diverse projects across sectors, from infrastructure to applications and tech solutions.'}
          </p>
        </div>

        {/* الفلاتر */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* السلايدر */}
        {filteredProjects.length > 0 ? (
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="overflow-hidden px-2 py-4"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: isRTL
                    ? `translateX(${currentIndex * (100 / visibleCards)}%)`
                    : `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                }}
              >
                {filteredProjects.map((project) => (
                  <div
                    key={project._id}
                    className="flex-shrink-0 px-3"
                    style={{ width: `${100 / visibleCards}%` }}
                  >
                    <ProjectCard project={project} isRTL={isRTL} lang={lang} />
                  </div>
                ))}
              </div>
            </div>

            {/* أزرار التنقل */}
            {maxIndex > 0 && (
              <>
                <button
                  onClick={isRTL ? nextSlide : prevSlide}
                  aria-label="Previous"
                  className="hidden md:flex absolute top-1/2 -translate-y-1/2 -start-2 lg:-start-4 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 items-center justify-center text-gray-700 transition-all duration-300 hover:scale-110 z-20"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={isRTL ? prevSlide : nextSlide}
                  aria-label="Next"
                  className="hidden md:flex absolute top-1/2 -translate-y-1/2 -end-2 lg:-end-4 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 items-center justify-center text-gray-700 transition-all duration-300 hover:scale-110 z-20"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* نقاط التنقل */}
            {maxIndex > 0 && (
              <div className="flex items-center justify-center gap-2.5 mt-10">
                {[...Array(maxIndex + 1)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex
                        ? 'w-10 h-3 bg-gradient-to-r from-indigo-600 to-purple-600'
                        : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              {isRTL ? 'لا توجد مشاريع في هذا التصنيف حالياً.' : 'No projects in this category yet.'}
            </p>
          </div>
        )}

        {/* زر عرض كل المشاريع */}
        <div className="mt-12 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            {isRTL ? 'عرض جميع المشاريع' : 'View All Projects'}
            <span>{isRTL ? '←' : '→'}</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

// ============================================
// 🎴 بطاقة المشروع
// ============================================
const ProjectCard = ({ project, isRTL, lang }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      to="/portfolio"
      className="group block h-full"
    >
      <div className="relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-indigo-200 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">

        {/* صورة المشروع / الخلفية الملونة */}
        <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${project.gradient}`}>

          {!imageError && project.image && (
            <img
              src={project.image}
              alt={project.title?.[lang]}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          )}

          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl opacity-90 transition-transform duration-700 group-hover:scale-125">
                {project.icon}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* شارة الفئة */}
          <div className="absolute top-4 end-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-xs font-bold text-gray-800 shadow-lg">
            {project.categoryLabel?.[lang] || project.category}
          </div>

        </div>

        {/* محتوى البطاقة */}
        <div className="relative flex-1 p-6 flex flex-col">

          <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors duration-300">
            {project.title?.[lang]}
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-1">
            {project.description?.[lang]}
          </p>

          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm group-hover:gap-3 transition-all duration-300">
            <span>{isRTL ? 'عرض المشروع' : 'View Project'}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              {isRTL ? '←' : '→'}
            </span>
          </div>

        </div>

      </div>
    </Link>
  );
};

export default Portfolio;