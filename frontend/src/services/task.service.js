// src/services/task.service.js
import api from './axios-config';

export const taskService = {
  getTasks: (userType) => {
    return api.get(`/task/${userType}/tasks`);
  },
  
  getPresetTasks: (userType) => {
    return api.get(`/task/${userType}/preset-tasks`);
  },
  
  getPresetTaskDetails: (userType, taskId) => {
    return api.get(`/task/${userType}/preset-task/${taskId}`);
  },
  
  createTask: (taskData) => {
    return api.post('/task/parent', taskData);
  },
  
  updateTask: (userType, taskId, taskData) => {
    return api.patch(`/task/${userType}/${taskId}`, taskData);
  },
  
  deleteTask: (taskId) => {
    return api.delete(`/task/parent/${taskId}`);
  }
};