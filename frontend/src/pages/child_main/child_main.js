import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import taskEntrance from "../../assets/taskEntrance.png";
import shopEntrance from "../../assets/shopEntrance.png";
import axios from 'axios';
import "./child_main.css"
import Drawer from "./drawer.js";

const Child_main = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }


      try {
        // 这里可以添加一个获取用户信息的API调用
        // 使用存储的token来获取最新的用户数据
        const response = await axios({
          method: 'get',
          url: '/api/v1/user/profile', // 假设有这个获取用户信息的端点
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data.code === 1) {
          setName(response.data.data.name);
        } else {
          throw new Error(response.data.msg);
        }
        setIsLoading(false);
      } catch (err) {
        setError(err.response?.data?.msg || err.message);
        setIsLoading(false);
        // 如果是认证错误，重定向到登录页面
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="flex h-screen items-center justify-center text-red-500">{error}</div>;
  }


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