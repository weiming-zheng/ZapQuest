import React from 'react';
import PropTypes from 'prop-types';
import './Comment.css';

const Comment = ({ text, date }) => {
  return (
    <div className="comment">
      <p className="comment-date">{date}</p>
      <p className="comment-content">{text}</p>
    </div>
  );
};

Comment.propTypes = {
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Comment;
