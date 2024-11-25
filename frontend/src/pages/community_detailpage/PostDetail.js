import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PostDetail.css';

const PostDetail = ({ title, postTime, content, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes); // 控制点赞数
  const [liked, setLiked] = useState(false); // 控制是否已经点赞
  const [showComments, setShowComments] = useState(false); // 控制是否跳转到评论区域

  // 点赞按钮点击事件
  const handleLikeClick = () => {
    setLiked(!liked); // 切换点赞状态
    setLikes(likes + (liked ? -1 : 1)); // 根据点赞状态增加或减少点赞数
  };

  // 跳转到评论框
  const handleCommentClick = () => {
    setShowComments(true);
    document.getElementById('comment-box').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="post-detail">
      <h1 className="post-title">{title}</h1>
      <p className="post-time">{postTime}</p>
      <div className="post-content">
        <p>{content}</p>
      </div>

      <div className="post-actions">
        <button className="comment-button" onClick={handleCommentClick}>
          Comment
        </button>
        <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLikeClick}>
          <i className="far fa-thumbs-up"></i>Like
        </button>
        <p className='like-detail'>{likes} people like this</p>
      </div>

      {showComments && (
        <div id="comment-box" className="comment-box">
          <h3>发表评论</h3>
          <textarea className="comment-input" placeholder="写下你的评论..." />
          <button className="submit-comment-button">提交</button>
        </div>
      )}
    </div>
  );
};

PostDetail.propTypes = {
  title: PropTypes.string.isRequired,
  postTime: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  initialLikes: PropTypes.number, // 初始点赞数
};

PostDetail.defaultProps = {
  initialLikes: 0, // 默认点赞数为 0
};

export default PostDetail;
