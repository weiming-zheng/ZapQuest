import React, { useState, useEffect } from "react";
import './MainContent.css';
import axios from 'axios';
import SearchBar from '../../components/SearchBar';
import PostButton from './PostButton';
import MyPost from './MyPost';
import Post from "./Post";
import Modal from '../../components/Modal';

function MainContent({ isMyPost, onToggleMyPost, buttonText }) {
    const [posts, setPosts] = useState([]);
    const [sortOrder, setSortOrder] = useState("mostRecent");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState("add"); 
    const [modalData, setModalData] = useState({});

    // 从后端获取帖子数据
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`/api/posts`);
                setPosts(response.data); // 假设后端返回的帖子数据格式符合预期
            } catch (error) {
                console.error("Error fetching posts", error);
            }
        };

        fetchPosts();
    }, []);

    const getPostsToDisplay = () => (isMyPost ? posts.filter(post => post.isMyPost) : posts);

    const handleAddPost = () => {
        setModalMode("add"); 
        setModalData({});
        setIsModalVisible(true); 
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

    const handleSubmit = async (data) => {
        if (modalMode === "edit") {
            try {
                const response = await axios.put(`/api/posts/${modalData.id}`, data);
                if (response.data.success) {
                    // 更新帖子列表
                    setPosts(posts.map(post => (post.id === data.id ? response.data.updatedPost : post)));
                }
            } catch (error) {
                console.error("Error editing post", error);
            }
        } else if (modalMode === "delete") {
            try {
                const response = await axios.delete(`/api/posts/${modalData.id}`);
                if (response.data.success) {
                    // 从帖子列表中移除被删除的帖子
                    setPosts(posts.filter(post => post.id !== data.id));
                }
            } catch (error) {
                console.error("Error deleting post", error);
            }
        } else if (modalMode === "add") {
            try {
                const response = await axios.post(`/api/posts`, data);
                if (response.data.success) {
                    setPosts([response.data.newPost, ...posts]); // 添加新帖子
                }
            } catch (error) {
                console.error("Error adding post", error);
            }
        }

        setIsModalVisible(false);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const getSortedPosts = (posts) => {
        return [...posts].sort((a, b) => {
            if (sortOrder === "mostLikes") {
                return b.like - a.like;
            }
            return new Date(b.createdAt) - new Date(a.createdAt);
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
                </div>
            </div>
            {postsToDisplay.map((post, index) => (
                <Post
                    key={index}
                    postId={post.id}
                    title={post.title}
                    content={post.content}
                    like={post.like}
                    hasLiked={post.hasLiked}
                    createdAt={post.createdAt}
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
