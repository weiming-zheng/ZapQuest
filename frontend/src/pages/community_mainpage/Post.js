import React, { useState } from "react";
import './Post.css';

function Post({ postId, title, content, like, hasLiked, createdAt, onEdit, onDelete, onLike, isMyPost }) {
    const [currentLikes, setCurrentLikes] = useState(like);
    const [isLiked, setIsLiked] = useState(hasLiked);

    // 点赞操作
    const handleLike = () => {
        const newLikedState = !isLiked;
        setIsLiked(newLikedState);  // 切换点赞状态
        setCurrentLikes(newLikedState ? currentLikes + 1 : currentLikes - 1);  // 更新点赞数

        // 向父组件通知点赞状态变化
        onLike(postId, newLikedState);
    };

    // 删除操作
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            onDelete(postId);  // 父组件处理删除
        }
    };

    // 编辑操作
    const handleEdit = () => {
        onEdit(postId);  // 父组件处理编辑
    };

    // 格式化日期
    const formatDate = (dateArray) => {
        const [year, month, day, hour, minute, second] = dateArray;
        return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day} ${hour}:${minute}:${second}`;
    };

    return (
        <div className="post">
            <div className="post-header">
                <h3 className="post-title">{title}</h3>
                {isMyPost && (
                    <div className="post-actions">
                        <button onClick={handleEdit} className="edit-button">
                            <i className="fa fa-edit"></i>
                        </button>
                        <button onClick={handleDelete} className="delete-button">
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                )}
            </div>
            <p className="post-content">{content}</p>
            <div className="post-footer">
                <div className="post-likes">
                    <button 
                        onClick={handleLike} 
                        className={`like-button ${isLiked ? 'liked' : ''}`}
                    >
                        <i className={`fa fa-thumbs-up ${isLiked ? 'liked' : ''}`}></i>
                        {currentLikes} Likes
                    </button>
                </div>
                <span className="post-date">{formatDate(createdAt)}</span>
            </div>
        </div>
    );
}

export default Post;
