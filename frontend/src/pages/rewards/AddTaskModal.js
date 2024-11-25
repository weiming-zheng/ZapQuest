import React ,{useState,useRef,useEffect} from "react";
import "./AddTaskModal.css";
import EmojiPicker from "emoji-picker-react";



function AddTaskModal ( {isOpen, onClose, mode, postData} ) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [avatar, setAvatar] = useState("🍦"); // 默认头像
  const [showPicker, setShowPicker] = useState(false);

  // 当用户选择 Emoji 时的回调
  const handleEmojiSelect = (emoji) => {
    setAvatar(emoji.emoji); // 设置头像为用户选择的 Emoji
    setShowPicker(false); // 隐藏 Emoji Picker
  };

  useEffect(() => {
    if (mode === "edit" && postData) {
        setTitle(postData.title);
        setPrice(postData.price);
    } else {
        setTitle("");
        setPrice("");
    }
}, [mode, postData]);

  const handleSubmit = () => {
    alert(`Task Created: title ${title}, price ${price}`);
    onClose();
  };
  const handleDelete = () => {
    // onSubmit(postData); 
    onClose();
  };

  if (!isOpen) return null;  // 如果没有显示状态，则不渲染 Modal
  
  return (
      <div>
        {/* 弹窗 */}
        <div className="modal">
          <h2 className="title"> {mode === "add" ? "Creat a Reward" : mode === "edit" ? "Edit a Reward" : "Delete a Reward"}</h2>
          <button className="close-button" onClick={onClose}>
          <i className="fas fa-times"></i>
          </button>
          {mode !== "delete" && (
            <>
              <p className="content">Select an icon</p>
              <button
                className="avatar_button"
                onClick={() => setShowPicker(!showPicker)}
              >
                {avatar}
              </button>
              {showPicker && (
                <div className="emoji-picker">
                  <EmojiPicker onEmojiClick={handleEmojiSelect} />
                </div>
              )}
              <p className="content">Name</p>
              <input
                type="text"
                placeholder="Enter the Price..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="modal-input"
              />
              <p className="content">Price</p>
              <input
                type="text"
                placeholder="Enter the Price..."
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="modal-input"
              />
              <button className="submit" onClick={onClose}>Submit</button>
              </>
            )}
            {mode === "delete" && (
              <>
                <p style={{textAlign:"left", marginBottom:"10px"}}>Are you sure you want to delete this reward ? <br />
                  You won't be able to undo this action.</p>
                <div className="modal-buttons">
                  <button className="post-cancel-button" onClick={onClose}>
                    Cancel
                  </button>    
                  <button className="post-submit-button" onClick={handleDelete}>
                    Delete
                  </button>                
                </div>
               </>
            )}
            
        </div>
  
        {/* 背景遮罩 */}
        <div className="modalOverlay"
          onClick={onClose}

        />
      </div>
    );

}


export default AddTaskModal;