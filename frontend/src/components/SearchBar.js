import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
      // 执行搜索逻辑，可以通过传递 searchTerm 触发搜索
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
          <i className="fas fa-search"></i> {/* 放大镜图标 */}
      </button>
    </div>
  );
}

export default SearchBar;