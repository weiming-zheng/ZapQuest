// Community_mainpage.js
import React, { useState } from 'react';
import Header from '../../components/Header';  
import SideBar from '../../components/SideBar';
import MainContent from './MainContent';
import './community_mainpage.css';

function Community_mainpage() {
  const [isMyPost, setIsMyPost] = useState(false);
  const [buttonText, setButtonText] = useState('我的帖子');

  const handleToggleMyPost = () => {
    setIsMyPost(!isMyPost);  
    setButtonText(isMyPost ? '我的帖子' : '所有帖子');
  };

  return (
    <div className="community_mainpage">
      <SideBar className="sidebar" />
      <Header title="社区" />
      <MainContent 
        isMyPost={isMyPost} 
        onToggleMyPost={handleToggleMyPost} 
        buttonText={buttonText} 
      />
    </div>
  );
}

export default Community_mainpage;