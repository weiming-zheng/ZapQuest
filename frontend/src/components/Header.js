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
            onClick={onBreadcrumbClick} // 回调函数处理点击事件
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
  title: PropTypes.string, // 当前标题，必需
  breadcrumb: PropTypes.string, // 面包屑文字，非必需
  onBreadcrumbClick: PropTypes.func, // 点击面包屑的回调
};

Header.defaultProps = {
  breadcrumb: null, // 默认无面包屑
  onBreadcrumbClick: null, // 默认无点击操作
};

export default Header;
