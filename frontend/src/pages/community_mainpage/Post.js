import React, { useState } from "react";
import './Post.css';
import { Link } from 'react-router-dom';

function Post({ postId, title, content, like, hasLiked, createdAt, onEdit, onDelete, onLike, isMyPost }) {
    const [currentLikes, setCurrentLikes] = useState(like);
    const [isLiked, setIsLiked] = useState(hasLiked);

    const handleLike = () => {
        const newLikedState = !isLiked;
        setIsLiked(newLikedState);  
        setCurrentLikes(newLikedState ? currentLikes + 1 : currentLikes - 1);  

        onLike(postId, newLikedState);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            onDelete(postId);  
        }
    };

    const handleEdit = () => {
        onEdit(postId);  
    };

    const formatDate = (dateArray) => {
        const [year, month, day, hour, minute, second] = dateArray;
        return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day} ${hour}:${minute}:${second}`;
    };

    return (
        <div className="post">
            <div className="post-header">
                <Link to={`/community-detail/${postId}`} className="post-title">
                    {title}
                </Link>
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
