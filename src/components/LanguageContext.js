// LanguageContext.js
import React, { createContext, useState, useContext } from 'react';
import en from './lang/en.json';
import ar from './lang/ar.json';

const languages = {
  en,
  ar
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en'); // Default language is English

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const translate = (key) => {
    return languages[language][key] || key; // If translation is not found, return the key itself
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
