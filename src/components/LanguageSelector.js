// LanguageSelector.js
import React from 'react';
import { useLanguage } from './LanguageContext';

function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  return (
    <div className="LanguageSelector">
      <button onClick={() => handleLanguageChange('ar')}>Arabic</button>
      <button onClick={() => handleLanguageChange('en')}>English</button>
    </div>
  );
}

export default LanguageSelector;
