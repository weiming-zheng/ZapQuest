import React, { useState } from "react";
import './MainContent.css';
import SearchBar from '../components/SearchBar';
import PostButton from './PostButton';
import MyPost from './MyPost';
import Post from "./Post";
import Modal from '../components/Modal';

function MainContent({ isMyPost, onToggleMyPost, buttonText }) {
    const [sortOrder, setSortOrder] = useState("mostRecent");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState("add"); 
    const [modalData, setModalData] = useState({});

    const posts = [
        { title: "Helpful for ADHD management", content: "hhhhhhh", author: "user1", date: "2024-11-11 19:50", initialLikes: 100 },
        { title: "Encourage process", content: "hhhhhhh", author: "user2", date: "2024-11-12 11:20", initialLikes: 60 }
    ];

    const myPosts = [
        { title: "My post title", content: "66666666666", author: "bzq", date: "2024-11-14 09:50", initialLikes: 15 },
        { title: "My post title2", content: "999999", author: "bzq", date: "2023-10-11 09:10", initialLikes: 74 }
    ];

    const getPostsToDisplay = () => (isMyPost ? myPosts : posts);

    const handleAddPost = () => {
        setModalMode("add"); // 设置模式为 add
        setModalData({});
        setIsModalVisible(true); // 显示模态框
    };

    const handleEditPost = (post) => {
        setModalMode("edit");
        setModalData(post); 
        setIsModalVisible(true);
    };

    const handleDeletePost = (post) => {
        setModalMode("delete");
        setModalData(post); 
        setIsModalVisible(true);
    };

    const handleSubmit = (data) => {
        if (modalMode === "edit") {
            
        } else if (modalMode === "delete") {
            
        }
        setIsModalVisible(false); 
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const getSortedPosts = (posts) => {
        return [...posts].sort((a, b) => {
            if (sortOrder === "mostLikes") {
                return b.initialLikes - a.initialLikes;
            }
            return new Date(b.date) - new Date(a.date);
        });
    };

    const postsToDisplay = getSortedPosts(getPostsToDisplay());


    return (
        <div className="maincontent">
            <div className="top-section">
            <select
                className="sort-dropdown"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
            >
                <option value="mostRecent">Most Recent</option>
                <option value="mostLikes">Most Likes</option>
            </select>
            <div className="search-post-container">

                <SearchBar />
                <MyPost onClick={onToggleMyPost} buttonText={buttonText} />
                <PostButton onClick={handleAddPost}/>
            </div></div>
            {postsToDisplay.map((post, index) => (
                <Post
                    key={index}
                    title={post.title}
                    content={post.content}
                    author={post.author}
                    date={post.date}
                    initialLikes={post.initialLikes}
                    isMyPost={isMyPost}
                    onEdit={() => handleEditPost(post)}
                    onDelete={() => handleDeletePost(post)}
                />
            ))}
            <Modal
                isVisible={isModalVisible}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                mode={modalMode}
                postData={modalData}
            />
        </div>
    );
}

export default MainContent;
