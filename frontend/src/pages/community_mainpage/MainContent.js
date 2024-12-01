import React, { useState, useEffect } from "react";
import './MainContent.css';
import axios from 'axios';
import SearchBar from '../../components/SearchBar';
import PostButton from './PostButton';
import MyPost from './MyPost';
import Post from "./Post";
import Modal from '../../components/Modal';
import { forumService } from '../../services';


function MainContent({ isMyPost, onToggleMyPost, buttonText }) {
    const [posts, setPosts] = useState([]);
    const [sortOrder, setSortOrder] = useState("mostRecent");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState("add"); 
    const [modalData, setModalData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchPosts = async () => {
        try {
            setLoading(true);
            setError(null);
            
            console.log('开始获取帖子...');
            const result = await forumService.getAllThreads();
            console.log('获取到的结果:', result);
    
            // 此时 result 应该直接是 { code, msg, data } 结构
            if (!result || typeof result !== 'object') {
                throw new Error('响应格式错误');
            }
    
            const { code, data } = result;
            console.log('解析结果:', { code, data });
    
            if (code !== 1 || !Array.isArray(data)) {
                throw new Error('数据格式不正确');
            }
    
            const formattedPosts = data.map(post => ({
                ...post,
                createdAt: formatDate(post.createdAt)
            }));
    
            console.log('格式化后的帖子:', formattedPosts);
            setPosts(formattedPosts);
        } catch (err) {
            console.error('获取帖子错误:', err);
            setError(err.message || '获取帖子失败，请稍后再试');
        } finally {
            setLoading(false);
        }
    };
    
    // 分离日期格式化函数
    const formatDate = (dateArray) => {
        if (!Array.isArray(dateArray)) return '';
        
        return `${dateArray[0]}-${String(dateArray[1]).padStart(2, '0')}-${String(dateArray[2]).padStart(2, '0')} ${String(dateArray[3]).padStart(2, '0')}:${String(dateArray[4]).padStart(2, '0')}:${String(dateArray[5]).padStart(2, '0')}`;
    };

    useEffect(() => {
        // 开发测试用的token
        if (!localStorage.getItem('token')) {
            localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJwYXJlbnRJZCI6MSwiZXhwIjoxNzMzMzQyMzQ5fQ.kpPh6eW0dBgu47VcS6d28lgMglaDTsGlaoKRgRYlf74');
        }
        fetchPosts();
    }, [isMyPost]);


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
            {loading ? (
                <div className="loading">加载中...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <>
                    <div className="top-section">
                        <select
                            className="sort-dropdown"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="mostRecent">最新</option>
                            <option value="mostLikes">最多点赞</option>
                        </select>
                        <div className="search-post-container">
                            <SearchBar />
                            <MyPost onClick={onToggleMyPost} buttonText={buttonText} />
                            <PostButton onClick={() => setIsModalVisible(true)} />
                        </div>
                    </div>

                    {posts.map((post) => (
                        <Post
                            key={post.id}
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
                        onClose={() => setIsModalVisible(false)}
                        onSubmit={handleSubmit}
                        mode={modalMode}
                        postData={modalData}
                    />
                </>
            )}
        </div>
    );
}

export default MainContent;