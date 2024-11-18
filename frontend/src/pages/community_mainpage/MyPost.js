import React from 'react';
import './MyPost.css';  

function MyPost({ onClick , buttonText}) {
    return (
        <button className="my-post" onClick={onClick}>
            {buttonText}
        </button>
    );
}

export default MyPost;