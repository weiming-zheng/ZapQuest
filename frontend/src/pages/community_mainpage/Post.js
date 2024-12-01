import React, { useState } from "react";
import axios from 'axios';
import './Post.css';

function Post({ postId, title, content, like, hasLiked, createdAt, onEdit, onDelete }) {
    const [currentLikes, setCurrentLikes] = useState(like);
    const [isLiked, setIsLiked] = useState(hasLiked);

    // 点赞操作
    const handleLike = async () => {
        try {
            const response = await axios.put(`/api/posts/${postId}/like`, { liked: !isLiked });
            if (response.data.success) {
                setIsLiked(!isLiked);
                setCurrentLikes(response.data.updatedPost.like); // 更新点赞数
            }
        } catch (error) {
            console.error("Error liking post", error);
        }
    };

    // 删除操作
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            onDelete(); // 父组件处理删除
        }
    };

    // 编辑操作
    const handleEdit = () => {
        onEdit(); // 父组件处理编辑
    };

    // 格式化日期
    const formatDate = (dateArray) => {
        const [year, month, day, hour, minute, second] = dateArray;
        return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day} ${hour}:${minute}:${second}`;
    };

    return (
        <div className="post">
            <h3 className="post-title">{title}</h3>
            <p className="post-content">{content}</p>
            <div className="post-info">
                <span className="post-date">{formatDate(createdAt)}</span>
                <div className="post-actions">
                    <button onClick={handleLike} className="like-button">
                        {/* 点赞按钮 */}
                        <i className={`fa ${isLiked ? 'fa-thumbs-down' : 'fa-thumbs-up'}`}></i>
                        {currentLikes} Likes
                    </button>
                    <button onClick={handleEdit} className="edit-button">
                        {/* 编辑按钮 */}
                        <i className="fa fa-edit"></i>
                    </button>
                    <button onClick={handleDelete} className="delete-button">
                        {/* 删除按钮 */}
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Post;
