import React from 'react';
import { useLanguage } from './LanguageContext';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

function LanguageSelector({onClick}) {
  const { changeLanguage } = useLanguage();
  const settings = [
    { key: 'en', label: 'English' },
    { key: 'ar', label: 'العربية' }
  ];

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
    onClick();
  };

  return (
    <>
      {settings.map(({ key, label }) => (
        <MenuItem key={key} onClick={() => handleLanguageChange(key)}>
          <Typography textAlign="center">{label}</Typography>
        </MenuItem>
      ))}
    </>
  );
}

export default LanguageSelector;
