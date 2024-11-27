import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import taskEntrance from "../../assets/taskEntrance.png";
import shopEntrance from "../../assets/shopEntrance.png";
import "./child_main.css"
import Drawer from "./drawer.js";

const Child_main = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const username ="Haru";
const userid ="123";

  

  const MainView = () => (
    
      <div className="flex flex-col h-screen bg-gray-100">
        {/* Drawer Component */}
      <Drawer 
      isOpen={isDrawerOpen} 
      onClose={() => setIsDrawerOpen(false)} 
      userid={userid}
      username={username}
      />
      {/* Header */}
      <header className="p-4 flex items-center justify-between bg-white">
        <div onClick={() => setIsDrawerOpen(true)} className="cursor-pointer">
          <Menu className="w-6 h-6" />
        </div>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold">
          ZapQuest
        </h1>
      </header>
      {/* Main Content */}
      <main className="flex-1 p-4 space-y-4">
        {/* Task Board Card */}
        <div 
          className="card"
          onClick={() => console.log('Task Board clicked')}
        >
          <div className="relative">
            <img className="pic_task"
              src={taskEntrance}
            />
            <div className="absolute top-4 left-4">
              <h2 className="text_task">Task Board</h2>
            </div>
          </div>
        </div>

        {/* Shop Card */}
        <div 
          className="card2"
          onClick={() => console.log('Shop clicked')}
        >
          <div className="relative">
            <img className="pic_shop"
              src={shopEntrance}
            />
            <div className="absolute top-4 left-4">
              <h2 className="text_shop">Shop</h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  return <MainView />;
};

export default Child_main;