import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideBar.css';
import Logo from '../assets/ZAP_QUEST.png';
import LogoutModal from './logout_modal';

function SideBar() {
  const [showModal, setShowModal] = useState(false);

  const location = useLocation(); // Get the current location/pathname

  useEffect(() => {
    // Update the currentPage when the URL changes
  }, [location]);

  const handleLogout = () => {
    setShowModal(false);
    // Add logout logic here (e.g., clearing tokens, redirecting to login page)
  };

  const renderSidebarLink = (to, page, label, iconClass) => {
    const isActive = location.pathname === to; // Check if the current path matches the link
    return (
      <Link
        to={to}
        className={`sidebar-link ${isActive ? 'active' : ''}`}
      >
        <i className={iconClass}></i>
        {label}
      </Link>
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo-container">
        <img src={Logo} alt="Logo" className="sidebar-logo" />
      </div>

      <div className="copy-code">
        <span>CHILD LOGIN CODE:</span>
        <span id="code-text">232893218</span>
        <button onClick={() => navigator.clipboard.writeText('your code')}>
          <i className="fa fa-copy"></i>
        </button>
      </div>

      <nav className="sidebar-nav">
        {renderSidebarLink('/parent-tasks', '/parent-tasks', 'Tasks', 'far fa-clock')}
        {renderSidebarLink('/rewards', '/rewards', 'Rewards', 'far fa-star')}
        {renderSidebarLink('/community', '/community', 'Community', 'fas fa-user-group')}
        <div className="sidebar-link" onClick={() => setShowModal(true)}>
          <i className="fas fa-right-from-bracket"></i>
          Log out
        </div>
      </nav>

      <LogoutModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleLogout}
        title="Log out"
        message="Are you sure you want to log out?"
      />
    </div>
  );
}

export default SideBar;
