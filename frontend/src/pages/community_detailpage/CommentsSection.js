import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment'; // 单条评论组件
import './CommentsSection.css';
import { forumService } from '../../services/forum.service'; // 引入 forumService

const CommentsSection = ({ commentsData, postId, updatePost }) => {
  const [commentContent, setCommentContent] = useState(''); // 评论内容的状态
  const [isSubmitting, setIsSubmitting] = useState(false); // 提交状态

  // 处理评论内容的变化
  const handleCommentChange = (event) => {
    setCommentContent(event.target.value);
  };

  // 处理评论的提交
  const handleCommentSubmit = async () => {
    if (isSubmitting || !commentContent) return;  // 防止重复提交或空内容

    setIsSubmitting(true);

    try {
      // 发送 POST 请求将评论提交到后端
      const response = await forumService.createComment(postId, { content: commentContent });
      if (response.data.success) {
        // 评论成功后更新帖子数据
        updatePost();  // 调用父组件的更新方法，重新获取帖子数据
        setCommentContent('');  // 清空评论输入框
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
          const formattedDate = formatDate(comment.createdAt);  // 格式化日期
          return (
            <Comment
              key={comment.id}
              date={formattedDate}
              text={comment.content}
            />
          );
        })}
        {/* 发布评论区域 */}
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

// 格式化日期方法，将 [年, 月, 日, 时, 分, 秒, 毫秒] 数组转换为字符串
const formatDate = (dateArray) => {
  const [year, month, day, hour, minute, second] = dateArray;
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day} ${hour}:${minute}:${second}`;
};

CommentsSection.propTypes = {
  commentsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      createdAt: PropTypes.array.isRequired,  // 确保 `createdAt` 是一个数组
      content: PropTypes.string.isRequired,  // 评论内容
    })
  ).isRequired,
  postId: PropTypes.number.isRequired,  // 帖子的 ID
  updatePost: PropTypes.func.isRequired,  // 更新帖子数据的回调
};

export default CommentsSection;
