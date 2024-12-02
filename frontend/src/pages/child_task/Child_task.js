// Child_task.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Task from './Task';
import { taskService } from '../../services/task.service'; // 导入taskService
import './Child_task.css';

const Child_task = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);  // 用来存储从后端获取的任务数据
  const [loading, setLoading] = useState(true);  // 用来控制加载状态
  const [error, setError] = useState(null);  // 用来处理错误

  // 获取任务数据的函数
  const fetchTasks = async () => {
    try {
      const response = await taskService.getTasks('child'); // 假设是获取儿童任务数据
      console.log('获取的任务数据:', response);
      setTasks(response); // 将后端数据设置到tasks
    } catch (err) {
      console.error('获取任务失败:', err);
      setError('无法加载任务数据');
    } finally {
      setLoading(false); // 加载完成后设置为false
    }
  };

  // 在组件挂载时获取任务数据
  useEffect(() => {
    fetchTasks();
  }, []);

  // 如果数据正在加载中，显示 loading 状态
  if (loading) {
    return <div>Loading...</div>;
  }

  // 如果加载失败，显示错误信息
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="child-task">
      {/* Header */}
      <header className="child-task__header">
        <button
          onClick={() => navigate('/child-main')}
          className="child-task__back-button"
        >
          <i className="fas fa-arrow-left child-task__back-icon"></i>
        </button>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold">
          ZapQuest
        </h1>
      </header>

      {/* Main Content */}
      <main className="child-task__content">
        {tasks.map((task) => (
          <Task
            key={task.id}
            taskId={task.id}
            taskName={task.name}
            rewardAmount={task.bonus}
          />
        ))}
      </main>
    </div>
  );
};

export default Child_task;
