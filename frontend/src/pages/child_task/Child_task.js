// Child_task.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Task from './Task'; 
import './Child_task.css'; 

const Child_task = () => {
  const navigate = useNavigate(); 

  const tasks = [
    { taskId: 1, taskName: 'Complete Homework', rewardAmount: 50 },
    { taskId: 2, taskName: 'Clean Room', rewardAmount: 30 },
    { taskID: 3, taskName: 'Sleep' , rewardAmount: 1 },
    { taskId: 4, taskName: 'Practice Piano', rewardAmount: 40 },
    { taskId: 5, taskName: 'Feed Pet', rewardAmount: 20 },
    { taskId: 6, taskName: 'Feed Pet', rewardAmount: 20 },
    { taskId: 5, taskName: 'Feed Pet', rewardAmount: 20 },
    { taskId: 5, taskName: 'Feed Pet', rewardAmount: 20 },
    { taskId: 5, taskName: 'Feed Pet', rewardAmount: 20 },
    { taskId: 5, taskName: 'Feed Pet', rewardAmount: 20 },

  ];

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
            key={task.taskId}
            taskId={task.taskId}
            taskName={task.taskName}
            rewardAmount={task.rewardAmount}
          />
        ))}
      </main>
    </div>
  );
};

export default Child_task;
