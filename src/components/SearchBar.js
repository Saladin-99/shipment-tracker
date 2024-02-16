// SearchBar.js
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <div className="SearchBar">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Enter shipping number"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
