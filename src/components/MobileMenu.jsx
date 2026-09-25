// src/components/MobileMenu.jsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const MobileMenu = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/services', label: t('nav.services') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      {/* زر Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col justify-center items-center w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-gray-800 dark:bg-gray-100 transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-gray-800 dark:bg-gray-100 my-1.5 transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-gray-800 dark:bg-gray-100 transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}
        />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* القائمة المنزلقة */}
      <div
        className={`fixed top-0 ${
          isRTL ? 'right-0' : 'left-0'
        } h-full w-72 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'
        }`}
      >
        {/* رأس القائمة */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
          <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {t('footer.company')}
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center text-2xl text-gray-600 dark:text-gray-300"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* الروابط */}
        <nav className="flex flex-col p-5 gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3 rounded-xl text-lg font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer القائمة */}
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {i18n.language === 'ar' ? 'اللغة' : 'Language'}
            </span>
            <LanguageSwitcher />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {i18n.language === 'ar' ? 'الوضع' : 'Theme'}
            </span>
            <ThemeToggle />
          </div>
          <Link
            to="/contact"
            className="block w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center px-6 py-3 rounded-xl font-bold hover:from-indigo-600 hover:to-purple-700 transition shadow-lg"
          >
            {t('nav.cta')}
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;