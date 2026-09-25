// src/components/Header.jsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isRTL = i18n.language === 'ar';

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // ✅ روابط التنقل — مع إضافة Blog
  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/services', label: t('nav.services') },
    { to: '/blog', label: isRTL ? 'المدونة' : 'Blog' },
    { to: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path) => location.pathname === path;

  const formatDate = () =>
    currentTime.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const formatTime = () =>
    currentTime.toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <header className="sticky top-0 z-50 w-full">

      {/* ===== الشريط البنفسجي العلوي ===== */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-10 text-xs">

            <div className="flex items-center gap-4">
              <a
                href="mailto:info@BlazePoint.net"
                className="flex items-center gap-1.5 hover:text-yellow-300 transition"
              >
                <span>📧</span>
                <span className="hidden sm:inline">info@BlazePoint.net</span>
              </a>
              <span className="hidden md:flex items-center gap-1.5">
                <span>📍</span>
                <span>{isRTL ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia'}</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden md:flex items-center gap-1.5">
                <span>🕐</span>
                <span>{formatTime()}</span>
              </span>
              <span className="hidden lg:flex items-center gap-1.5">
                <span>📅</span>
                <span>{formatDate()}</span>
              </span>
              <a
                href="https://wa.me/96611418368"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center transition"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ===== الهيدر الأبيض الرئيسي ===== */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20 gap-4">

            {/* ============================================
                ✅ الشعار - مع حركات مبتكرة (يمين في RTL)
                ============================================ */}
            <Link
              to="/"
              className="flex-shrink-0 relative group logo-float"
            >
              {/* توهج خلفي */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500" />

              {/* الشعار */}
              <div className="relative bg-white rounded-2xl p-2 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-indigo-500/30 group-hover:scale-110 group-hover:rotate-3">
                <Logo size="md" />
              </div>

              {/* نقاط متحركة */}
              <span className="absolute -top-1 -end-1 w-2 h-2 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
              <span className="absolute -bottom-1 -start-1 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
            </Link>

            {/* ============================================
                ✅ الروابط - في الوسط
                ============================================ */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                    isActive(link.to)
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                  {isActive(link.to) && (
                    <span className="absolute -bottom-0.5 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* ============================================
                ✅ الأزرار - آخر عنصر (يسار في RTL)
                ============================================ */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <LanguageSwitcher />
              <ThemeToggle />

              <Link
                to="/contact"
                className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl font-bold text-xs lg:text-sm hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap"
              >
                {isRTL ? 'ابدأ الآن' : 'Get Started'}
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl bg-gray-100 hover:bg-indigo-100 flex items-center justify-center transition-all duration-300"
                aria-label="Toggle Menu"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* قائمة الموبايل */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />

      {/* ============================================
          🎨 الحركات المخصصة للشعار
          ============================================ */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .logo-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        .group:hover .logo-float > div:nth-child(2) {
          animation: wiggle 0.5s ease-in-out;
        }
      `}</style>

    </header>
  );
};

export default Header;