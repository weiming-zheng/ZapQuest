import React ,{useState,useEffect} from "react";
import "./AddTaskModal.css";
import EmojiPicker from "emoji-picker-react";
import { rewardService } from '../../services'; 



function AddTaskModal ( {isOpen, onClose, mode, postData , onSuccess} ) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [avatar, setAvatar] = useState("🍦"); // defalut avatar
  const [showPicker, setShowPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (mode === "edit" && postData) {
      // 从 postData 中读取当前项目的数据
      setTitle(postData.name || "");  // 注意这里应该是 name 而不是 title
      setPrice(postData.price?.toString() || ""); // 转换为字符串并处理可能的 undefined
      setAvatar(postData.iconId || "🍦"); // 使用已有的图标或默认图标
    } else {
      // 新建模式下重置为默认值
      setTitle("");
      setPrice("");
      setAvatar("🍦");
    }
  }, [mode, postData]); // 依赖项包括 mode 和 postData

  const handleEmojiSelect = (emoji) => {
    setAvatar(emoji.emoji); // set the outcome as the user's choice
    setShowPicker(false); // hide Emoji Picker
  };

  const handleSubmit = async () => {
    if (!title || !price) {
      setError("Please fill in all fields");
      return;
    }
  
    setIsSubmitting(true);
    setError("");
  
    try {
      const itemData = {
        name: title,
        price: parseInt(price),
        iconId: avatar
      };
  
      let response;
      if (mode === "edit" && postData?.id) {
        // 编辑现有项目
        response = await rewardService.updateShopItem(postData.id, itemData);
      } else {
        // 创建新项目
        response = await rewardService.createShopItem(itemData);
      }
      
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message || `Failed to ${mode === "edit" ? "update" : "create"} reward`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!postData?.id) {
      setError("Invalid item to delete");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await rewardService.deleteShopItem(postData.id);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message || "Failed to delete reward");
    } finally {
      setIsSubmitting(false);
    }
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

          {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}

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
                placeholder="Enter the Name..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="modal-input"
                disabled={isSubmitting}
              />
              <p className="content">Price</p>
              <input
                type="text"
                placeholder="Enter the Price..."
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="modal-input"
                disabled={isSubmitting}
              />
              <button 
                className="submit" 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Submit"}
              </button>
              </>
            )}
            {mode === "delete" && (
              <>
                <p style={{textAlign:"left", marginBottom:"10px"}}>Are you sure you want to delete this reward ? <br />
                  You won't be able to undo this action.</p>
                <div className="modal-buttons">
                <button 
                  className="post-cancel-button" 
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                    Cancel
                  </button>    
                  <button 
                  className="post-submit-button" 
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                    {isSubmitting ? "Deleting..." : "Delete"}
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