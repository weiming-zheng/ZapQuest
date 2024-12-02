import React, { useState } from 'react';
import './Task.css'; 
import coin from "../../assets/coin.png"; 
import { taskService } from '../../services/task.service'; 

const Task = ({ taskId, taskName, rewardAmount, initialStatus }) => {
  const [isDone, setIsDone] = useState(initialStatus === 'complete'); 
  const [error, setError] = useState(null); 

  const handleComplete = async () => {
    setIsDone(true); 

    const updatedTaskData = {
      status: 'complete' 
    };

    try {
      await taskService.updateTask('child', taskId, updatedTaskData);
      console.log('task completed');
    } catch (error) {
      setError('update task failed,try again');
      console.error('failed to update tasks:', error);
    }
  };

  return (
    <div className={`task ${isDone ? 'task--done' : ''}`}>
      <div className="task__content">
        <h2 className="task__title">{taskName}</h2>
        <div className="task__bottom">
          <div className="task__reward">
            <span>{rewardAmount}</span>
            <img className="task__coin" src={coin} alt="coin" />
          </div>
          <button
            onClick={handleComplete}
            className="task__complete-button"
            disabled={isDone} 
          >
            Complete
          </button>
        </div>
      </div>
      {isDone && <div className="task__done-text">Done!</div>}
      {isDone && <div className="task__overlay" />}
      {error && <div className="task__error">{error}</div>} 
    </div>
  );
};

export default Task;
