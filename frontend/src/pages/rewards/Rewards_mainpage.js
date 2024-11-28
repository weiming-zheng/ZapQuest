import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import RewardsMainContent from "./RewardsMainContent";
import "./Rewards_mainpage.css";

function Rewards_mainpage(){
    return (<div className="community_mainpage">
        <SideBar className="sidebar" />
        <Header title = "Rewards" />  
        <RewardsMainContent  />
        
        
      </div>);
}

export default Rewards_mainpage;