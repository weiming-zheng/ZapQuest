import React, { useState } from "react";
import './Post.css';


function Post({ title, content, author, date, initialLikes, isMyPost, onEdit, onDelete }) {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(initialLikes);

    const handleLikeClick = () => {
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    };

    const handleTitleClick = (e) => {
        e.preventDefault(); 
        console.log("Title clicked, no navigation.");
    };

    return (
        <div className="post">
            <div className="post-header">
                <a href="#" className="post-title" onClick={handleTitleClick}>
                    {title}
                </a>
                {isMyPost && (
                    <div className="post-actions">
                        <button onClick={onEdit} className="edit-button">
                            <i className="fas fa-edit"></i>
                        </button>
                        <button onClick={onDelete} className="delete-button">
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                )}
            </div>
            <p className="post-content">{content}</p>
            <div className="post-footer">
                <span className="post-likes" onClick={handleLikeClick}>
                    <i className={`fas fa-heart ${isLiked ? 'liked' : ''}`}></i> {initialLikes}
                </span>
                <span className="post-date">
                    <i className="fas fa-clock"></i>{date}
                </span>
            </div>
        </div>
    );
}

export default Post;
