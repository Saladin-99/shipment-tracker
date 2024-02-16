// Header.js
import React from 'react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from './LanguageContext';

function Header() {
  const { language } = useLanguage();

  return (
    <div className="Header">
      <div className="HeaderText">
        {language === 'ar' ? 'نص عنوان' : 'Header Text'}
      </div>
      <div className="LanguageSelectorContainer">
        <LanguageSelector />
      </div>
    </div>
  );
}

export default Header;
