import React, { useState } from 'react';
import './Task.css'; 
import coin from "../../assets/coin.png"; 

const Task = ({ taskId, taskName, rewardAmount }) => {
  const [isDone, setIsDone] = useState(false); 

  const handleComplete = () => {
    setIsDone(true); 
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
    </div>
  );
};

export default Task;
