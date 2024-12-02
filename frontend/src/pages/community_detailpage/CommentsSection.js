import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment'; 
import './CommentsSection.css';
import { forumService } from '../../services/forum.service'; 

const CommentsSection = ({ commentsData, postId, updatePost }) => {
  const [commentContent, setCommentContent] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  // handle change of comment
  const handleCommentChange = (event) => {
    setCommentContent(event.target.value);
  };

  // handle submit of comment
  const handleCommentSubmit = async () => {
    if (isSubmitting || !commentContent) return;  

    setIsSubmitting(true);

    try {
      const response = await forumService.createComment(postId, { content: commentContent });
      if (response.data.success) {
        // update
        updatePost();  
        setCommentContent('');  
      } else {
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="comment-box" className="comments-section">
      <p className='comment-head'>Comments</p>
      <div className="comments-list">
        {commentsData.map((comment) => {
          const formattedDate = formatDate(comment.createdAt);  
          return (
            <Comment
              key={comment.id}
              date={formattedDate}
              text={comment.content}
            />
          );
        })}
        {/* area for posting comments  */}
        <div className="comment-input">
          <p className='comment-area'>Comment</p>
          <textarea
            className="comment-textarea"
            placeholder="Write your comment..."
            value={commentContent}
            onChange={handleCommentChange}
          />
          <button
            className="submit-comment-button"
            onClick={handleCommentSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

const formatDate = (dateArray) => {
  const [year, month, day, hour, minute, second] = dateArray;
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day} ${hour}:${minute}:${second}`;
};

CommentsSection.propTypes = {
  commentsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      createdAt: PropTypes.array.isRequired,  
      content: PropTypes.string.isRequired,  
    })
  ).isRequired,
  postId: PropTypes.number.isRequired,  
  updatePost: PropTypes.func.isRequired,  
};

export default CommentsSection;
