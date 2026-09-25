// src/components/TopBar.jsx

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const TopBar = () => {
  const { i18n } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());

  const isRTL = i18n.language === 'ar';

  // 🕐 تحديث الوقت كل ثانية
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 📅 التاريخ الميلادي (عربي)
  const formatGregorianAr = () => {
    return currentTime.toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // 📅 التاريخ الهجري (عربي)
  const formatHijriAr = () => {
    return currentTime.toLocaleDateString('ar-SA-u-ca-islamic', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // 📅 التاريخ الميلادي (إنجليزي)
  const formatGregorianEn = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // 📅 التاريخ الهجري (إنجليزي)
  const formatHijriEn = () => {
    return currentTime.toLocaleDateString('en-US-u-ca-islamic', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // 🕐 تنسيق الوقت
  const formatTime = () => {
    return currentTime.toLocaleTimeString(isRTL ? 'ar-EG' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white text-xs md:text-sm hidden md:block">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center py-2 gap-4">
          
          {/* ============================================
              📧 يمين: البريد الإلكتروني
              ============================================ */}
          <div className="flex items-center gap-3 md:gap-5">
            <a
              href="mailto:info@BlazePoint.net"
              className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors duration-300"
            >
              <span className="text-base">📧</span>
              <span className="hidden xl:inline font-semibold">
                info@BlazePoint.net
              </span>
            </a>

            <span className="hidden xl:inline text-white/30">|</span>

            <div className="hidden xl:flex items-center gap-1.5">
              <span className="text-base">📍</span>
              <span className="font-semibold">
                {isRTL ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia'}
              </span>
            </div>

          </div>

          {/* ============================================
              🕐 وسط: الوقت + التاريخ
              ============================================ */}
          <div className="flex items-center gap-2 md:gap-4 text-xs">
            
            {/* 🕐 الوقت */}
            <div className="flex items-center gap-1.5">
              <span className="text-base">🕐</span>
              <span className="font-bold tabular-nums" dir="ltr">
                {formatTime()}
              </span>
            </div>

            <span className="text-white/30">|</span>

            {/* 📅 التاريخ */}
            <div className="flex items-center gap-1.5">
              <span className="text-base">📅</span>
              
              {isRTL ? (
                <span className="font-semibold hidden lg:inline">
                  {formatHijriAr()} هـ
                  <span className="mx-1.5 text-yellow-300">•</span>
                  {formatGregorianAr()} م
                </span>
              ) : (
                <span className="font-semibold hidden lg:inline">
                  {formatGregorianEn()}
                  <span className="mx-1.5 text-yellow-300">•</span>
                  {formatHijriEn()} AH
                </span>
              )}

              <span className="font-semibold lg:hidden">
                {isRTL ? formatHijriAr() : formatGregorianEn()}
              </span>
            </div>

          </div>

          {/* ============================================
              💬 يسار: أيقونة واتساب فقط
              ============================================ */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/96611418368"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center justify-center w-9 h-9 bg-green-500 hover:bg-green-600 rounded-full transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-white"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TopBar;