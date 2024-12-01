import React,{useState}from 'react';
import Header from '../../components/Header';  
import SideBar from '../../components/SideBar';
import MainContent from './MainContent';
import './community_mainpage.css';

function Community_mainpage() {
  const [isMyPost, setIsMyPost] = useState(false);
  const [buttonText, setButtonText] = useState('My Post');

  const handleToggleMyPost = () => {
    setIsMyPost(!isMyPost);  
    setButtonText(isMyPost?'My Post':'All Posts');
  };

  return (
    <div className="community_mainpage">
      <MainContent isMyPost={isMyPost} onToggleMyPost={handleToggleMyPost} buttonText={buttonText} />
      <SideBar />
      
      <Header title="Community" />
    </div>
  );
}

export default Community_mainpage;
