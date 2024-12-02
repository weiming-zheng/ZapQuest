import React, { useState } from 'react';
import './Task.css'; 
import coin from "../../assets/coin.png"; 
import { taskService } from '../../services/task.service'; // 导入任务服务

const Task = ({ taskId, taskName, rewardAmount, initialStatus }) => {
  const [isDone, setIsDone] = useState(initialStatus === 'complete'); // 根据初始状态设置是否完成
  const [error, setError] = useState(null); // 错误状态

  // 完成任务处理
  const handleComplete = async () => {
    setIsDone(true); // 本地状态更新为已完成

    const updatedTaskData = {
      status: 'complete' // 设置为完成状态
    };

    try {
      // 调用 API 更新任务状态
      await taskService.updateTask('child', taskId, updatedTaskData);
      console.log('任务已完成');
    } catch (error) {
      setError('任务更新失败，请重试');
      console.error('更新任务失败:', error);
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
            disabled={isDone} // 如果任务已完成，则禁用按钮
          >
            Complete
          </button>
        </div>
      </div>
      {isDone && <div className="task__done-text">Done!</div>}
      {isDone && <div className="task__overlay" />}
      {error && <div className="task__error">{error}</div>} {/* 错误信息 */}
    </div>
  );
};

export default Task;
