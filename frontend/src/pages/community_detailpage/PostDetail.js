import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PostDetail.css';

const PostDetail = ({ title, postTime, content, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
    setLikes(likes + (liked ? -1 : 1));
  };

  // junp to bottom of commentbox
  const scrollToCommentBox = () => {
    const commentsSection = document.querySelector('.comments-section');
    const commentInput = document.querySelector('.comment-input');
    if (commentsSection && commentInput) {
      commentsSection.scrollTop = commentInput.offsetTop;
    }
  };
  

  return (
    <div className="post-detail">
      <h1 className="post-title">{title}</h1>
      <p className="post-time">{postTime}</p>
      <div className="post-content">
        <p>{content}</p>
      </div>

      <div className="post-actions">
        {/* add comment button */}
        <button className="comment-button" onClick={scrollToCommentBox}>
          Comment
        </button>
        {/* like button */}
        <button
          className={`like-button ${liked ? 'liked' : ''}`} 
          onClick={handleLikeClick}
        >
          <i className="far fa-thumbs-up"></i>
          {liked ? 'Liked' : 'Like'}
        </button>
        <p className="like-detail">{likes} people like this</p>
      </div>
    </div>
  );
};

PostDetail.propTypes = {
  title: PropTypes.string.isRequired,
  postTime: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  initialLikes: PropTypes.number,
};

PostDetail.defaultProps = {
  initialLikes: 0,
};

export default PostDetail;
