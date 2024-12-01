// src/services/forum.service.js
import axiosInstance from './axios-config';

export const forumService = {

  getAllThreads: async () => {
    try {
        console.log('开始请求帖子...');
        const response = await axiosInstance.get('/forum/parent/all-threads');
        console.log('API原始响应:', response);
        
        // 直接返回 response.data，因为这已经是后端返回的数据结构
        return response.data;
    } catch (error) {
        console.error('getAllThreads错误:', error);
        throw error;
    }
},

  getMyThreads: () => {
    return axiosInstance.get('/forum/parent/my-threads')
      .then(response => response.data)
      .catch(error => {
        console.error('获取帖子失败:', error);
        throw error;
      });
  },
  
  // searchThreads: (keyword) => {
  //   return api.get('/forum/parent/search', { params: { keyword } });
  // },
  
  // createThread: (threadData) => {
  //   return api.post('/forum/parent', threadData);
  // },
  
  // updateThread: (threadId, threadData) => {
  //   return api.patch(`/forum/parent/${threadId}`, threadData);
  // },
  
  // deleteThread: (threadId) => {
  //   return api.delete(`/forum/parent/${threadId}`);
  // },
  
  // toggleLike: (threadId, like) => {
  //   return api.post(`/forum/parent/${threadId}/like`, null, { params: { like } });
  // },
  
  // createComment: (threadId, commentData) => {
  //   return api.post(`/forum/parent/${threadId}/comment`, commentData);
  // }
};