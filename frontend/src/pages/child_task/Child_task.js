// Child_task.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Task from './Task';
import { taskService } from '../../services/task.service'; // 导入taskService
import './Child_task.css';

const Child_task = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);  // store task data from backend
  const [loading, setLoading] = useState(true);  // control loading status
  const [error, setError] = useState(null);  // handle error

  // get tasks
  const fetchTasks = async () => {
    try {
      const response = await taskService.getTasks('child'); 
      setTasks(response); 
    } catch (err) {
      console.error('failed:', err);
      setError('can not load');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
