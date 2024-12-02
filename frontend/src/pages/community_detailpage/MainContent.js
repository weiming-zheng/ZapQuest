import React, { useState, useEffect } from 'react';
import PostDetail from './PostDetail';
import CommentsSection from './CommentsSection';
import './MainContent.css';
import { forumService } from '../../services';
import { useParams } from 'react-router-dom';

const MainContent = () => {
  const { id } = useParams();  // 获取 URL 参数中的 id
  const [post, setPost] = useState(null);  // 用于存储单个帖子的详细数据
  const [loading, setLoading] = useState(true);  // 控制加载状态
  const [error, setError] = useState(null);  // 用于存储错误信息

  const initializePost = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await forumService.getAllThreads();
  
      // 输出整个响应数据
      console.log("Full Response:", response);
  
      const postId = parseInt(id, 10); // 确保 postId 是数字
      console.log("Parsed postId:", postId);
  
      // 检查数据结构并查找帖子
      if (response && Array.isArray(response)) {
        const post = response.find(item => item.id === postId);
        if (post) {
          console.log("Found Post:", post);
          setPost(post);
        } else {
          console.warn("No post found with ID:", postId);
          setError("未找到对应的帖子");
        }
      } else {
        console.error("Invalid data structure:", response.data);
        setError("数据结构无效");
      }
    } catch (error) {
      console.error("加载帖子失败:", error);
      setError("帖子加载失败，请稍后再试");
    } finally {
      setLoading(false);
    }
  };

    // 更新帖子数据（获取最新的帖子数据，包括新评论）
    const updatePost = async () => {
      await initializePost();
    };
  

  // 在组件加载时调用
  useEffect(() => {
    initializePost();
  }, [id]);  // 每次 id 变化时重新加载帖子

  // 如果数据还在加载中，显示 loading 状态
  if (loading) {
    return <div>Loading...</div>;
  }

  // 如果没有获取到帖子数据，显示错误信息
  if (error) {
    return <div>{error}</div>;
  }

  // 如果找不到帖子，显示提示信息
  if (!post) {
    return <div>没有找到帖子</div>;
  }

  return (
    <div className="maincontent">
      <PostDetail
        title={post.title}
        postTime={formatDate(post.createdAt)}  // 格式化时间
        content={post.content}
        initialLikes={post.like}
      />
      <CommentsSection
        commentsData={post.comments}
        postId={post.id}
        updatePost={updatePost}  // 传递更新方法
      />
    </div>
  );
};

// 格式化时间的方法 (处理年月日时分秒数组)
const formatDate = (dateArray) => {
  const [year, month, day, hour, minute, second] = dateArray;
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day} ${hour}:${minute}:${second}`;
};

export default MainContent;
