import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import taskEntrance from "../../assets/taskEntrance.png";
import shopEntrance from "../../assets/shopEntrance.png";
import "./child_main.css"
import Drawer from "./drawer.js";

const Child_main = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 检查登录状态
    const token = localStorage.getItem('token');
    const storedName = localStorage.getItem('childName');
    
    if (!token) {
      navigate('/login');
      return;
    }

    if (storedName) {
      setName(storedName);
    }
  }, [navigate]);

  const MainView = () => (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Drawer Component */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        username={name}
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
          onClick={() => navigate('/child-tasks')} // 添加导航
        >
          <div className="relative">
            <img className="pic_task"
              src={taskEntrance}
              alt="Task Board"
            />
            <div className="absolute top-4 left-4">
              <h2 className="text_task">Task Board</h2>
            </div>
          </div>
        </div>

        {/* Shop Card */}
        <div
          className="card2"
          onClick={() => navigate('/child-shop')} // 添加导航
        >
          <div className="relative">
            <img className="pic_shop"
              src={shopEntrance}
              alt="Shop"
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