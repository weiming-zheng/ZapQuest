import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

function Header({ title, breadcrumb, onBreadcrumbClick }) {
  return (
    <header className="header">
      <nav className="header-nav">
        {breadcrumb && (
          <span
            className="breadcrumb"
            onClick={onBreadcrumbClick} 
            style={{ cursor: 'pointer', color: '#007bff' }}
          >
            {breadcrumb}
          </span>
        )}
        {breadcrumb && <span className="breadcrumb-separator"> / </span>}
        <span className="current-title">{title}</span>
      </nav>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string, 
  breadcrumb: PropTypes.string, 
  onBreadcrumbClick: PropTypes.func, 
};

Header.defaultProps = {
  breadcrumb: null, 
  onBreadcrumbClick: null, 
};

export default Header;
