import React,{useState}from 'react';
import Header from '../../components/Header';  
import SideBar from '../../components/SideBar';
import MainContent from './MainContent';
import './community_detailpage.css';

function Community_detailpage(){
    return(
        <div className='community_detailpage'>
            <Header>
                <p className='route'>title</p>
            </Header>
            <MainContent />
            <SideBar />
        </div>
    );
}

export default Community_detailpage;