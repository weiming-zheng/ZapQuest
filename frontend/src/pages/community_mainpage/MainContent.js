import React, { useState, useEffect } from "react";
import './MainContent.css';
import SearchBar from '../../components/SearchBar';
import PostButton from './PostButton';
import MyPost from './MyPost';
import Post from "./Post";
import Modal from '../../components/Modal';
import { forumService } from '../../services';

function MainContent() {
    const [allPosts, setAllPosts] = useState([]); // 存储所有帖子
    const [myPosts, setMyPosts] = useState([]);  // 存储我的帖子
    const [isMyPost, setIsMyPost] = useState(false); // 当前是否为我的帖子视图
    const [sortOrder, setSortOrder] = useState("mostRecent"); // 排序方式
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [modalData, setModalData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 格式化日期
    const formatDate = (dateArray) => {
        const [year, month, day, hour, minute, second] = dateArray;
        return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day} ${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
    };

    // 初始化“所有帖子”和“我的帖子”
    const initializePosts = async () => {
        setLoading(true);
        setError(null);

        try {
            const [allThreads, myThreads] = await Promise.all([
                forumService.getAllThreads(),
                forumService.getMyThreads()
            ]);

            setAllPosts(allThreads);
            setMyPosts(myThreads);
        } catch (error) {
            console.error("初始化帖子失败:", error);
            setError("帖子加载失败，请稍后再试");
        } finally {
            setLoading(false);
        }
    };

    // 在组件加载时调用
    useEffect(() => {
        initializePosts();
    }, []);

    // 过滤当前视图的帖子
    const postsToDisplay = isMyPost ? myPosts : allPosts;

    // 排序帖子列表
    const getSortedPosts = (posts) => {
        if (!Array.isArray(posts)) {
            console.error("Expected posts to be an array, but got", typeof posts);
            return [];
        }

        return [...posts].sort((a, b) => {
            if (sortOrder === "mostLikes") {
                return b.like - a.like; // 按点赞数排序
            }
            // 处理时间排序，确保 createdAt 是有效的时间格式
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA; // 按时间排序
        });
    };

    // 添加新帖子
    const handleAddPost = async (data) => {
        try {
            const response = await forumService.createThread(data);

            if (response.success) {
                const newPost = response.data;

                // 更新本地缓存
                setAllPosts((prevAllPosts) => [newPost, ...prevAllPosts]);
                setMyPosts((prevMyPosts) => [newPost, ...prevMyPosts]);
            } else {
                console.error("新增帖子失败:", response.message);
            }
        } catch (error) {
            console.error("新增帖子失败:", error);
        } finally {
            setIsModalVisible(false);
        }
    };

    // 编辑帖子
    const handleEditPost = (post) => {
        setModalMode("edit");
        setModalData(post);
        setIsModalVisible(true);
    };

    // 删除帖子
    const handleDeletePost = (post) => {
        setModalMode("delete");
        setModalData(post);
        setIsModalVisible(true);
    };

    // 提交数据（增加、编辑、删除帖子）
    const handleSubmit = async (data) => {
        try {
            let response;
            if (modalMode === "edit") {
                response = await forumService.updateThread(modalData.id, data);
                if (response.success) {
                    const updatedPost = response.data;
                    setAllPosts((prevAllPosts) =>
                        prevAllPosts.map((post) =>
                            post.id === updatedPost.id ? updatedPost : post
                        )
                    );
                    setMyPosts((prevMyPosts) =>
                        prevMyPosts.map((post) =>
                            post.id === updatedPost.id ? updatedPost : post
                        )
                    );
                }
            } else if (modalMode === "delete") {
                response = await forumService.deleteThread(modalData.id);
                if (response.success) {
                    setAllPosts((prevAllPosts) =>
                        prevAllPosts.filter((post) => post.id !== modalData.id)
                    );
                    setMyPosts((prevMyPosts) =>
                        prevMyPosts.filter((post) => post.id !== modalData.id)
                    );
                }
            } else if (modalMode === "add") {
                response = await forumService.createThread(data);
                if (response.success) {
                    const newPost = response.data;
                    setAllPosts((prevAllPosts) => [newPost, ...prevAllPosts]);
                    setMyPosts((prevMyPosts) => [newPost, ...prevMyPosts]);
                }
            }
        } catch (error) {
            console.error("提交数据失败:", error);
        } finally {
            setIsModalVisible(false);
        }
    };

    // 点赞帖子
    const handleLikePost = async (postId, currentLikeStatus) => {
        try {
            const response = await forumService.toggleLike(postId, !currentLikeStatus);

            if (response.success) {
                const updatedPost = response.data;
                setAllPosts((prevAllPosts) =>
                    prevAllPosts.map((post) =>
                        post.id === postId ? updatedPost : post
                    )
                );
                setMyPosts((prevMyPosts) =>
                    prevMyPosts.map((post) =>
                        post.id === postId ? updatedPost : post
                    )
                );
            }
        } catch (error) {
            console.error("更新点赞状态失败:", error);
        }
    };

    // 关闭模态框
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

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
                            <MyPost
                                onClick={() => setIsMyPost(!isMyPost)}
                                buttonText={isMyPost ? "所有帖子" : "我的帖子"}
                            />
                            <PostButton onClick={() => setIsModalVisible(true)} />
                        </div>
                    </div>

                    {getSortedPosts(postsToDisplay).map((post) => (
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
                            onLike={(postId, currentLikeStatus) =>
                                handleLikePost(postId, currentLikeStatus)
                            }
                            isMyPost={isMyPost}
                        />
                    ))}

                    <Modal
                        isVisible={isModalVisible}
                        onClose={handleCloseModal}
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
