import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');
  const { translate } = useLanguage();

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <div className="SearchBar">
      <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          type="text"
          placeholder={translate('Enter shipping number')}
          value={searchValue}
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth
          sx={{ marginRight: '8px' }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </form>
    </div>
  );
}

export default SearchBar;
