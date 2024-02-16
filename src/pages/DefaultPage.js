// DefaultPage.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ShippingDetails from '../components/ShipmentDetails';

function DefaultPage() {
  const [searchValue, setSearchValue] = useState('');
  const [shippingData, setShippingData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (searchValue) {
      fetchShippingData(searchValue);
    }
  }, [searchValue]);

  const fetchShippingData = async (searchValue) => {
    try {
      const response = await fetch(`https://tracking.bosta.co/shipments/track/${searchValue}`);
      if (!response.ok) {
        throw new Error('Invalid tracking number'); // Throw an error if response is not ok
      }
      const data = await response.json();
      setShippingData(data);
      setErrorMessage(''); // Clear error message if successful
    } catch (error) {
      console.error(error);
      setErrorMessage('Invalid tracking number'); // Set error message if fetch fails
      setShippingData(null); // Clear shipping data
    }
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <div className="DefaultPage">
      <Header />
      <SearchBar onSearch={handleSearch} />
      {errorMessage && <div className="ErrorMessage">{errorMessage}</div>}
      <ShippingDetails shippingData={shippingData} />
    </div>
  );
}

export default DefaultPage;
