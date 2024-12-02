import React, { useState, useEffect } from "react";
import './MainContent.css';
import SearchBar from '../../components/SearchBar';
import PostButton from './PostButton';
import MyPost from './MyPost';
import Post from "./Post";
import Modal from '../../components/Modal';
import { forumService } from '../../services';

function MainContent() {
    const [allPosts, setAllPosts] = useState([]); // store all posts
    const [myPosts, setMyPosts] = useState([]);  // store my posts
    const [isMyPost, setIsMyPost] = useState(false); // check if is MyPost
    const [sortOrder, setSortOrder] = useState("mostRecent"); 
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [modalData, setModalData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // format date
    const formatDate = (dateArray) => {
        const [year, month, day, hour, minute, second] = dateArray;
        return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day} ${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
    };

    // initial all posts and my posts
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
            console.error("initialize failed:", error);
            setError("loading fail");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        initializePosts();
    }, []);

    const postsToDisplay = isMyPost ? myPosts : allPosts;

    // rank post list
    const getSortedPosts = (posts) => {
        if (!Array.isArray(posts)) {
            console.error("Expected posts to be an array, but got", typeof posts);
            return [];
        }

        return [...posts].sort((a, b) => {
            if (sortOrder === "mostLikes") {
                return b.like - a.like; // rank with most liked
            }
            
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA; // rank with most recent
        });
    };

    // add a new post
    const handleAddPost = async (data) => {
        try {
            const response = await forumService.createThread(data);

            if (response.success) {
                const newPost = response.data;

                setAllPosts((prevAllPosts) => [newPost, ...prevAllPosts]);
                setMyPosts((prevMyPosts) => [newPost, ...prevMyPosts]);
            } else {
                console.error("add failed:", response.message);
            }
        } catch (error) {
            console.error("add failed:", error);
        } finally {
            setIsModalVisible(false);
        }
    };

    // edit post
    const handleEditPost = (post) => {
        setModalMode("edit");
        setModalData(post);
        setIsModalVisible(true);
    };

    // delete post
    const handleDeletePost = (post) => {
        setModalMode("delete");
        setModalData(post);
        setIsModalVisible(true);
    };

    // submit data(edit,delete and add)
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
            console.error("submit failed:", error);
        } finally {
            setIsModalVisible(false);
        }
    };

    // like a post
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
            console.error("update failed:", error);
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="maincontent">
            {loading ? (
                <div className="loading">loading...</div>
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
                            <option value="mostRecent">Most recent</option>
                            <option value="mostLikes">Most liked</option>
                        </select>
                        <div className="search-post-container">
                            <SearchBar />
                            <MyPost
                                onClick={() => setIsMyPost(!isMyPost)}
                                buttonText={isMyPost ? "AllPost" : "MyPost"}
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
