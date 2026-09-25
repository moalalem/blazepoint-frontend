// src/components/Logo.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Logo = ({ size = 'md' }) => {
  const { i18n } = useTranslation();

  const logoSrc = i18n.language === 'ar'
    ? '/blazepoint-logo-ar.png'
    : '/blazepoint-logo.png';

  const sizes = {
    sm: 'h-10',
    md: 'h-14',
    lg: 'h-16',
    xl: 'h-24',
  };

  const sizeClass = sizes[size] || sizes.md;

  return (
    <Link to="/" className="flex items-center">
      <img
        src={logoSrc}
        alt="BlazePoint - PROMISING FUTURE"
        className={`${sizeClass} w-auto transition-transform duration-300`}
      />
    </Link>
  );
};

export default Logo;