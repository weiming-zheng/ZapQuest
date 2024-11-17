import React, { useState, useEffect } from "react";
import "./Modal.css";

function Modal({ isVisible, onClose, onSubmit, mode, postData }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (mode === "edit" && postData) {
            setTitle(postData.title);
            setContent(postData.content);
        } else {
            setTitle("");
            setContent("");
        }
    }, [mode, postData]);

    const handleSubmit = () => {
        onSubmit({ title, content });
        setTitle("");
        setContent("");
        onClose();
    };

    const handleDelete = () => {
        onSubmit(postData); // 在删除时只提交 postData
        onClose();
    };

    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2 className="modal-title">
                    {mode === "add" ? "Add a Message" : mode === "edit" ? "Edit a Message" : "Delete a message"}
                </h2>

                {mode !== "delete" && (
                    <>
                        <p className="topic">Topic</p>
                        <input
                            type="text"
                            placeholder="Enter the title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="modal-input"
                        />
                        <p className="content">Content</p>
                        <textarea
                            placeholder="Write your post content here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="modal-textarea"
                        />
                    </>
                )}
                {mode === "delete" && (
                    <p>Are you sure you want to delete this message? You won't be able to undo this action.</p>
                )}

                <div className="modal-buttons">
                    <button className="post-cancel-button" onClick={onClose}>
                        Cancel
                    </button>                    
                    {mode !== "delete" ? (
                        <button className="post-submit-button" onClick={handleSubmit}>
                            Submit
                        </button>
                    ) : (
                        <button className="post-submit-button" onClick={handleDelete}>
                            Delete
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Modal;
