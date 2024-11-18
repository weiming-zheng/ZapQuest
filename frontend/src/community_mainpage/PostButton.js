import React from "react";
import './PostButton.css';

function PostButton({ onClick }) {
  return (
    <div>
      <button className="post-button" onClick={onClick}>
        <i className="fas fa-plus"></i>
        Post
      </button>
    </div>
  );
}

export default PostButton;
