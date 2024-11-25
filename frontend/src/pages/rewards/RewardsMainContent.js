import React, { useState } from "react";
import "./RewardsMainContent.css";
import Task from "./Task";
import AddTaskModal from "./AddTaskModal";
import RedeemList from "./RedeemList";

function RewardsMainContent() {
 const [activeTab, setActiveTab] = useState("shop"); // 默认显示第一个标签
 const [modalMode, setModalMode] = useState("add"); 
 const [modalData, setModalData] = useState({});
 const [showModal, setShowModal] = useState(false);
 const [isRedeemed, setIsRedeemed] = useState(false);

 const tasks = [
  {title : "Ice cream with mom" ,price : "10" },
  {title : "Disneyland Travel" ,price : "2000"}
  ];

  const [redeemlist, setRedeemlist] = useState([
    { title: "Ice cream with mom", price: "10", isRedeemed: false },
    { title: "Disneyland Travel", price: "2000", isRedeemed: false },
  ]);

// 处理点击事件，显示弹窗
  const handleAddPost = () => {
      setModalMode("add"); // 设置模式为 add
      setModalData({});
      setShowModal(true); // 显示模态框
  };

  const handleEditPost = (tasks) => {
      setModalMode("edit");
      setModalData(tasks); 
      setShowModal(true);
  };

  const handleDeletePost = (tasks) => {
      setModalMode("delete");
      setModalData(tasks); 
      setShowModal(true);
  };

  const handleRedeem = (index) => {
    // 使用不可变数据更新方法
    setRedeemlist((prevList) =>
      prevList.map((item, idx) =>
        idx === index ? { ...item, isRedeemed: true } : item
      )
    );
    console.log(`Redeem clicked for index: ${index}`);
  };


const getSortedPosts = (tasks) => {
  return [...tasks].sort((a, b) => {
      const firstLetterA = a.title[0].toLowerCase();
      const firstLetterB = b.title[0].toLowerCase();
      
      if (firstLetterA < firstLetterB) {
          return -1;  // a 排在 b 前
      }
      if (firstLetterA > firstLetterB) {
          return 1;  // b 排在 a 前
      }
      return 0;  // a 和 b 相等，不变
  });
};


  redeemlist.sort((a, b) => {
    if (a.isRedeemed === b.isRedeemed) return 0; // 如果值相同，不改变顺序
    return b.isRedeemed ? -1 : 1; // true 在前，false 在后
  });

// 获取排序后的帖子
const sortedTasks = getSortedPosts(tasks);

// 处理关闭弹窗
const handleClose = () => {
  console.log("Modal close triggered");
  setShowModal(false);

};


  return (
    <div className="rewardsmaincontent ">
      {/* 标签按钮 */}
      <div className ="button">
        <button 
          style={{
            flex: 1,
            padding: "10px",
            border: "none",
            fontSize :"20px",
            borderBottom: activeTab === "shop" ? "2px solid blue" : "none",
            background: "transparent",
            fontWeight: activeTab === "shop" ? "bold" : "normal",
          }}
          onClick={() => setActiveTab("shop")}
        >
          Shop
        </button>
        <button 
          style={{
            flex: 1,
            padding: "10px",
            border: "none",
            fontSize :"20px",
            borderBottom: activeTab === "redeem" ? "2px solid blue" : "none",
            background: "transparent",
            fontWeight: activeTab === "redeem" ? "bold" : "normal",
          }}
          onClick={() => setActiveTab("redeem")}
        >
          Redeem
        </button>
      </div>
    

      {/* 内容显示区域 */}
      <div style={{ marginTop: "30px" }}>
        {activeTab === "shop" && (
          <div style={{ marginTop: "40px" }}>
            {sortedTasks.map((tasks, index) => (
                <Task
                    key={index}
                    title={tasks.title}
                    price={tasks.price}
                    onEdit={() => handleEditPost(tasks)}
                    onDelete={() => handleDeletePost(tasks)}
                />
            ))}
            <div className="addTask" onClick={handleAddPost}>
              <p style={{
                color : "#70AEFF",
                fontSize :"36px",
                marginLeft:"20px",
                marginRight:"20px",
                }}>+</p>
              <p  style={{
                color : "#1859FF",
                fontSize :"16px",
                fontWeight:"bold",
                marginRight:"20px",
                }}>ADD REWARD</p>
                
              </div>
          </div>
        )}
        {activeTab === "redeem" && (
          <div style={{ marginTop: "40px" }}>
            {redeemlist.map((redeemlist, index) => (
                <RedeemList
                    key={index}
                    title={redeemlist.title}
                    price={redeemlist.price}
                    isRedeemed={redeemlist.isRedeemed}
                    onRedeem={() => handleRedeem(index)}
                />
            ))}
          </div>
        )}
      </div>
      <AddTaskModal 
        isOpen={showModal} 
        onClose={handleClose}
        mode={modalMode}
        postData={modalData}
        />
    </div>
  );
}

export default RewardsMainContent;
