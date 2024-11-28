import React,{useState}from 'react';
import Header from '../../components/Header';  
import SideBar from '../../components/SideBar';
import MainContent from './MainContent';
import './community_detailpage.css';
import { useNavigate } from 'react-router-dom';

function Community_detailpage(){
    const navigate = useNavigate();

    const handleBreadcrumbClick = () => {
        navigate('/community'); // 返回 Community 页面
      };

    return(
        <div className='community_detailpage'>
            <Header title="Post Title" breadcrumb="Community" onBreadcrumbClick={handleBreadcrumbClick} />
            <MainContent />
            <SideBar style={{zIndex:9999}} />
        </div>
    );
}

export default Community_detailpage;