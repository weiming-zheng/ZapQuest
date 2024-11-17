import React,{useState}from 'react';
import Header from './Header';  
import SideBar from './SideBar';
import MainContent from './MainContent';
import './community_mainpage.css';

function Community_mainpage() {
  const [isMyPost, setIsMyPost] = useState(false);
  const [buttonText, setButtonText] = useState('My Post');

  const handleToggleMyPost = () => {
    setIsMyPost(!isMyPost);  // 切换状态
    setButtonText(isMyPost?'My Post':'All Posts');
  };

  return (
    <div className="community_mainpage">
      <MainContent isMyPost={isMyPost} onToggleMyPost={handleToggleMyPost} buttonText={buttonText} />
      <SideBar />
      
      <Header  />  
    </div>
  );
}

export default Community_mainpage;
