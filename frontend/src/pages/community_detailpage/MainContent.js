import React from 'react';
import PostDetail from './PostDetail';
import './MainContent.css'
import CommentsSection from './CommentsSection';

const MainContent = () => {
  const post = {
    title: 'I like ZapQuest',
    postTime: 'Post Date:2024-11-24',
    content: 'This is content :I’ve been using the app for a month now, and it has greatly improved my child’s task management. The interface is user-friendly, and the task tracking feature is especially helpful!',
    likes:100,
    commentsData:[
      {id:1,date:"2024-10-23",text:"That is really good！"},
      {id:2,date:"2024-11-14",text:"I’ve been using the app for a month now, and it has greatly improved my child’s task management. The interface is user-friendly, and the task tracking feature is especially helpful!"},
      {id:3,date:"2024-11-14",text:"I love it!"},
      {id:4,date:"2024-11-14",text:"I love it!"},
      {id:5,date:"2024-11-14",text:"I love it!"},
      {id:6,date:"2024-11-14",text:"I love it!"},
      {id:7,date:"2024-11-14",text:"I love it!"},
    ]
  };

  return (
    <div className="maincontent">
      <PostDetail
        title={post.title}
        postTime={post.postTime}
        content={post.content}
        initialLikes={post.likes}
      />
      <CommentsSection commentsData={post.commentsData} />
    </div>
  );
};

export default MainContent;
