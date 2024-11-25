import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import RewardsMainContent from "./RewardsMainContent";

function Rewards_mainpage(){
    return (<div className="community_mainpage">
        <Header header_name = "Rewards" />  
        <RewardsMainContent />
        <SideBar />
        
      </div>);
}

export default Rewards_mainpage;