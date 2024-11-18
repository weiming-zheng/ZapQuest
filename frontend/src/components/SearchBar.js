import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
      console.log("search content:", searchTerm);
  };
  return (
    <div className="search-form" >
      <input 
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search Here"
        className="search-input"
      />
      <button className="search-button" onClick={handleSearchClick}>
          <i className="fas fa-search"></i>
      </button>
    </div>
  );
}

export default SearchBar;