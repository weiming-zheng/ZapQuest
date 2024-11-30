import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CommunityPage from './pages/community_mainpage/community_mainpage.js';
import CommunityDetailPage from './pages/community_detailpage/community_detailpage.js';
import RoleSelectionPage from "./pages/Login/RoleSelection.js"; 
import ParentLogin from './pages/Login/ParentLogin.js';
import ChildLogin from './pages/Login/ChildLogin.js';
import RegistrationPage from './pages/Login/RegistrationPage';
import MainPage from './pages/LandingPage/LandingPage.js';
import ParentTasks from './pages/tasks/ParentTasks.js';
import Rewards_mainpage from "./pages/rewards/Rewards_mainpage.js";
import Child_main from './pages/child_main/child_main.js';



function App() {
  return (
    <Router>
      <div>
        
        {/* Set up routes for different login pages */}
        <Routes>
          {/* General Landing page */}
          <Route path="/" element={<MainPage />} />

          {/* Role Selection page */}
          <Route path="/login" element={<RoleSelectionPage />} />
          
          {/* Parent login page */}
          <Route path="/parent-login" element={<ParentLogin />} />
          
          {/* Child login page */}
          <Route path="/child-login" element={<ChildLogin />} />

          {/* Registration page */}
          <Route path="/register" element={<RegistrationPage />} />

          {/* Community Page*/}
          <Route path="/community" element={<CommunityPage/>} />

          {/* Parent Tasks page*/}
          <Route path="/parent-tasks" element={<ParentTasks />} />

          {/* Community Posts page*/}
          <Route path="/community-detail" element={<CommunityDetailPage />} />

          {/*Rewards page*/}
          <Route path="/rewards" element={<Rewards_mainpage />} />

          {/*Child main page*/}
          <Route path="/child-main" element={<Child_main />} />

          {/*Settings page*/}
          <Route path="/settings" element={<Child_main />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
