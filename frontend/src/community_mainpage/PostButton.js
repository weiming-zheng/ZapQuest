import React,{useState} from 'react';
import './PostButton.css';
import  Modal from '../components/Modal';

function PostButton() {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handlePostSubmit = (postData) => {
      console.log("Post submitted:", postData);
      // 在这里可以将 postData 传递给父组件或保存到状态中
  };
  return (
    <div>
      <button className="post-button" onClick={handleOpenModal}>
        <i className="fas fa-plus"></i>
        Post
      </button>
      <Modal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handlePostSubmit}
      /> 
    </div>   
  );
}

export default PostButton;