import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import child_avatar from "../../assets/childavatar.jpg";
import "./drawer.css";
import { authService } from '../../services/auth.service';

const MenuIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const Drawer = ({ isOpen, onClose, username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Call the logout method from auth service
    authService.logoutChild();
    // Navigate to login page
    navigate('/login');
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Account</h2>
            <button onClick={onClose} className="p-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        
          <div className="drawer-content">
            <div className="profile-container"> 
              <div className="w-24 h-24 rounded-full overflow-hidden bg-yellow-100">
                <img
                  src={child_avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold">{username}</h2>
            </div>
            <button
              className="logout_button"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;