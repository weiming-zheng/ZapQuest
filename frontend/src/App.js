import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CommunityPage from './pages/community_mainpage/community_mainpage.js';
import RoleSelectionPage from "./pages/Login/RoleSelection.js"; 
import ParentLogin from './pages/Login/ParentLogin.js';
import ChildLogin from './pages/Login/ChildLogin.js';
import RegistrationPage from './pages/Login/RegistrationPage';
import MainPage from './pages/LandingPage/LandingPage.js';
import ParentTasks from './pages/tasks/ParentTasks.js';



function App() {
  return (
    <Router>
      <div>
        
        {/* Set up routes for different login pages */}
        <Routes>
          {/* General Landing page */}
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<RoleSelectionPage />} />
          
          {/* Parent login page */}
          <Route path="/parent-login" element={<ParentLogin />} />
          
          {/* Child login page */}
          <Route path="/child-login" element={<ChildLogin />} />

          {/* Registration page */}
          <Route path="/register" element={<RegistrationPage />} />

          {/* Community Page*/}
          <Route path="/community-page" element={<CommunityPage/>} />

          {/* Parent Tasks page*/}
          <Route path="/parent-tasks" element={<ParentTasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
