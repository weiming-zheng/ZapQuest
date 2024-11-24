import React from 'react';
import PostDetail from './PostDetail';

const MainContent = () => {
  // 模拟从 API 或其他地方获取到的帖子数据
  const post = {
    title: 'I like ZapQuest',
    postTime: 'Post Date:2024-11-24',
    content: 'This is content hhhhhhhhhhhhhhhhh\nhhhhhhhhhhhhhhhhh\nhhhhhhhh \nhhhhhhhhhhhhhhhhhhhhh',
    likes:100
  };

  return (
    <div className="maincontent">
      <PostDetail
        title={post.title}
        postTime={post.postTime}
        content={post.content}
        initialLikes={post.likes}
      />
    </div>
  );
};

export default MainContent;
