// src/services/forum.service.js
import api from './axios-config';

export const forumService = {
  getAllThreads: () => {
    return api.get('/forum/parent/all-threads');
  },
  
  getMyThreads: () => {
    return api.get('/forum/parent/my-threads');
  },
  
  searchThreads: (keyword) => {
    return api.get('/forum/parent/search', { params: { keyword } });
  },
  
  createThread: (threadData) => {
    return api.post('/forum/parent', threadData);
  },
  
  updateThread: (threadId, threadData) => {
    return api.patch(`/forum/parent/${threadId}`, threadData);
  },
  
  deleteThread: (threadId) => {
    return api.delete(`/forum/parent/${threadId}`);
  },
  
  toggleLike: (threadId, like) => {
    return api.post(`/forum/parent/${threadId}/like`, null, { params: { like } });
  },
  
  createComment: (threadId, commentData) => {
    return api.post(`/forum/parent/${threadId}/comment`, commentData);
  }
};