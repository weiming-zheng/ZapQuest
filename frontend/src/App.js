import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CommunityPage from './pages/community_mainpage/community_mainpage.js';
import LoginPage from './pages/Login/LoginPage.js'
import ParentLogin from './pages/Login/ParentLogin.js';
import ChildLogin from './pages/Login/ChildLogin.js';
import MainPage from './pages/LandingPage/LandingPage.js';


function App() {
  return (
    <Router>
      <div>
        
        {/* Set up routes for different login pages */}
        <Routes>
          {/* General Landing page */}
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Parent login page */}
          <Route path="/parent-login" element={<ParentLogin />} />
          
          {/* Child login page */}
          <Route path="/child-login" element={<ChildLogin />} />

          {/* Community Page*/}
          <Route path="/community-page" element={<CommunityPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
