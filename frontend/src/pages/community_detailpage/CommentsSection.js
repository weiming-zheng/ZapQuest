import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment'; // 单条评论组件
import './CommentsSection.css';

const CommentsSection = ({ commentsData }) => {
  return (
    <div id="comment-box" className="comments-section">
      <p className='comment-head'>Comments</p>
      <div className="comments-list">
        {commentsData.map((comment) => (
          <Comment key={comment.id} date={comment.date} text={comment.text} />
        ))}
        {/* 发布评论区域 */}
        <div className="comment-input">
          <p className='comment-area'>Comment</p>
          <textarea
            className="comment-textarea"
            placeholder="Write your comment..."
          />
          <button className="submit-comment-button">Submit</button>
        </div>
      </div>
    </div>
  );
};

CommentsSection.propTypes = {
  commentsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CommentsSection;
