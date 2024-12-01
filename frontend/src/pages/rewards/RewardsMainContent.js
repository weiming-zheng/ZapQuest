import React, { useState, useEffect } from "react";
import "./RewardsMainContent.css";
import Task from "./Task";
import AddTaskModal from "./AddTaskModal";
import RedeemList from "./RedeemList";
import { rewardService } from '../../services';

function RewardsMainContent() {
  const [activeTab, setActiveTab] = useState("shop");
  const [modalMode, setModalMode] = useState("add");
  const [modalData, setModalData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [shopItems, setShopItems] = useState([]);
  const [redeemItems, setRedeemItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadShopItems = async () => {
    try {
      setIsLoading(true);
      setError("");
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError("Please login first");
        return;
      }

      const items = await rewardService.getShopItems('parent');
      if (Array.isArray(items)) {
        setShopItems(items);
      } else {
        setShopItems([]);
        console.warn('Received non-array data:', items);
      }
    } catch (err) {
      setError(err.message || "Failed to load shop items");
      console.error('Load shop items error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // loading the items been purchased
  const loadRedeemItems = async () => {
    try {
        setIsLoading(true);
        setError("");
        const items = await rewardService.getPurchasedItems('parent');
        if (Array.isArray(items)) {
            setRedeemItems(items);
        } else {
            setRedeemItems([]);
            console.warn('Received non-array data:', items);
        }
    } catch (err) {
        setError(err.message || "Failed to load purchased items");
        console.error('Load purchased items error:', err);
    } finally {
        setIsLoading(false);
    }
  };

  // 初始加载数据
  useEffect(() => {
    // 开发阶段：设置测试 token
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJwYXJlbnRJZCI6MSwiZXhwIjoxNzMzMjc0OTMwfQ.9_Xqt64pJOmnh_KMSzbB_kH2si4M6M2EersMqtdFMPg');

    if (activeTab === "shop") {
      loadShopItems();
    } else {
      loadRedeemItems();
    }
  }, [activeTab]);

  const handleAddPost = () => {
    setModalMode("add");
    setModalData({});
    setShowModal(true);
  };

  const handleEditPost = (item) => {
    setModalMode("edit");
    setModalData({
      id: item.id,
      name: item.name,  // 确保字段名称匹配
      price: item.price,
      iconId: item.iconId
    });
    setShowModal(true);
  };

  const handleDeletePost = (item) => {
    setModalMode("delete");
    setModalData(item);
    setShowModal(true);
  };


    // manage redeem status
    const handleRedeem = async (purchasedItemId) => {
      try {
          setIsLoading(true);
          setError("");
          await rewardService.redeemItem('parent', purchasedItemId);
          await loadRedeemItems(); // reload the list to update
      } catch (err) {
          setError(err.message || "Failed to redeem item");
          console.error('Redeem error:', err);
      } finally {
          setIsLoading(false);
      }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalData({});
    setError("");
  };

  const handleModalSuccess = async () => {
    await loadShopItems();
    handleModalClose();
  };

  // 对redeemItems按照是否已赎回状态进行排序
  const getSortedRedeemItems = () => {
    return [...redeemItems].sort((a, b) => {
      // 未赎回的排在前面
      if (a.isRedeemed === b.isRedeemed) {
        return 0;
      }
      return a.isRedeemed ? 1 : -1;
    });
  };

  return (
    <div className="rewardsmaincontent">
      <div className="button">
        <button 
          style={{
            flex: 1,
            padding: "10px",
            border: "none",
            fontSize: "20px",
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
            fontSize: "20px",
            borderBottom: activeTab === "redeem" ? "2px solid blue" : "none",
            background: "transparent",
            fontWeight: activeTab === "redeem" ? "bold" : "normal",
          }}
          onClick={() => setActiveTab("redeem")}
        >
          Redeem
        </button>
      </div>

      {error && (
        <div className="error-message" style={{ color: 'red', margin: '10px' }}>
          {error}
        </div>
      )}

      <div style={{ marginTop: "30px" }}>
        {activeTab === "shop" && (
          <div style={{ marginTop: "40px" }}>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                {shopItems.map((item) => (
                  <Task
                    key={item.id}
                    id={item.id}
                    iconId={item.iconId}
                    title={item.name}
                    price={item.price}
                    onEdit={() => handleEditPost(item)}
                    onDelete={() => handleDeletePost(item)}
                  />
                ))}
                <div className="addTask" onClick={handleAddPost}>
                  <p style={{
                    color: "#70AEFF",
                    fontSize: "36px",
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}>+</p>
                  <p style={{
                    color: "#1859FF",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginRight: "20px",
                  }}>ADD REWARD</p>
                </div>
              </>
            )}
          </div>
        )}
        
        {activeTab === "redeem" && (
            <div style={{ marginTop: "40px" }}>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    redeemItems.map((item) => (
                        <RedeemList
                            key={item.id}
                            id={item.id}
                            iconId={item.iconId}
                            title={item.name} 
                            price={item.price}
                            isRedeemed={item.isRedeemed}
                            onRedeem={() => handleRedeem(item.id)}
                        />
                    ))
                )}
            </div>
        )}
      </div>

      <AddTaskModal 
        isOpen={showModal} 
        onClose={handleModalClose}
        mode={modalMode}
        postData={modalData}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}

export default RewardsMainContent;