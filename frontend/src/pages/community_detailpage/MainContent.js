import React, { useState, useEffect } from 'react';
import PostDetail from './PostDetail';
import CommentsSection from './CommentsSection';
import './MainContent.css';
import { forumService } from '../../services';
import { useParams } from 'react-router-dom';

const MainContent = () => {
  const { id } = useParams();  // get id in url
  const [post, setPost] = useState(null);  // store data for a single post
  const [loading, setLoading] = useState(true);  // control load status
  const [error, setError] = useState(null);  // store error message

  const initializePost = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await forumService.getAllThreads();
  
      const postId = parseInt(id, 10); 
      console.log("Parsed postId:", postId);
  
      // find the post
      if (response && Array.isArray(response)) {
        const post = response.find(item => item.id === postId);
        if (post) {
          console.log("Found Post:", post);
          setPost(post);
        } else {
          console.warn("No post found with ID:", postId);
          setError("not find");
        }
      } else {
        console.error("Invalid data structure:", response.data);
        setError("invalid data structure");
      }
    } catch (error) {
      console.error("loading failed:", error);
      setError("load failed,try it again");
    } finally {
      setLoading(false);
    }
  };

    // update or edit post
    const updatePost = async () => {
      await initializePost();
    };
  
  useEffect(() => {
    initializePost();
  }, [id]);  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>post not found</div>;
  }

  return (
    <div className="maincontent">
      <PostDetail
        title={post.title}
        postTime={formatDate(post.createdAt)}  
        content={post.content}
        initialLikes={post.like}
      />
      <CommentsSection
        commentsData={post.comments}
        postId={post.id}
        updatePost={updatePost}  
      />
    </div>
  );
};

const formatDate = (dateArray) => {
  const [year, month, day, hour, minute, second] = dateArray;
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day} ${hour}:${minute}:${second}`;
};

export default MainContent;
