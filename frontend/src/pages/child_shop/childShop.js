import React, { useState, useEffect } from "react";
import { rewardService } from '../../services';

function ChildShopRedeem() {
  const [activeTab, setActiveTab] = useState("shop");
  const [shopItems, setShopItems] = useState([]);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [coins, setCoins] = useState(0);
  const [modal, setModal] = useState({ show: false, type: "", item: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch shop items, purchased items and coin balance
  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const [shopResponse, purchasedResponse, coinResponse] = await Promise.all([
        rewardService.getShopItems('child'),
        rewardService.getPurchasedItems('child'),
        rewardService.getCoinBalance()
      ]);
      setShopItems(shopResponse);
      setPurchasedItems(purchasedResponse);
      setCoins(coinResponse);
    } catch (err) {
      setError(err.message || "Failed to fetch items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 为了测试，先硬编码设置 child 的 token
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJjaGlsZElkIjoxLCJleHAiOjE3MzMzMjc5OTF9.XCr4fzbyzWGEM7VeIb_791uiokJnukqaHbXdW-z0p0w');
    fetchItems();
  }, []);

  // Handle purchase of shop item
  const handlePurchase = async (item) => {
    try {
      setLoading(true);
      await rewardService.createShopItem(item.id);
      await fetchItems(); // Refresh both lists
      setModal({ show: true, type: "success", item: null });
    } catch (err) {
      setModal({ 
        show: true, 
        type: "error", 
        item: null,
        message: err.message || "Failed to purchase item"
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle redeem purchased item
  const handleRedeem = async (itemId) => {
    try {
      setLoading(true);
      await rewardService.redeemItem('child', itemId);
      await fetchItems(); // Refresh the lists
      setModal({ show: true, type: "redeemed", item: null });
    } catch (err) {
      setModal({ 
        show: true, 
        type: "error", 
        item: null,
        message: err.message || "Failed to redeem item"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Coins Display */}
      <div className="flex justify-between items-center bg-indigo-600 p-4 text-white shadow-md">
        <h1 className="text-lg font-semibold">Shop & Redeem</h1>
        <div className="text-lg font-semibold">
          Coins: <span className="text-amber-300">{coins}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-around bg-indigo-700 text-white text-sm">
        <button
          className={`w-1/2 py-3 transition-colors duration-200 relative ${
            activeTab === "shop"
              ? "bg-indigo-800 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-indigo-500"
              : "hover:bg-indigo-600"
          }`}
          onClick={() => setActiveTab("shop")}
        >
          Shop
        </button>
        <button
          className={`w-1/2 py-3 transition-colors duration-200 relative ${
            activeTab === "redeem"
              ? "bg-indigo-800 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-indigo-500"
              : "hover:bg-indigo-600"
          }`}
          onClick={() => setActiveTab("redeem")}
        >
          Redeem
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4">
          {error}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "shop" && (
          <div className="space-y-4">
            {shopItems.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-4">{item.iconId}</span>
                  <div>
                    <h2 className="text-lg font-medium text-gray-800">{item.name}</h2>
                    <p className="text-gray-600">Price: {item.price} Coins</p>
                  </div>
                </div>
                <button
                  className="px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
                  onClick={() => setModal({ show: true, type: "buy", item })}
                  disabled={loading}
                >
                  Buy
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "redeem" && (
          <div className="space-y-4">
            {purchasedItems.length === 0 ? (
              <p className="text-center text-gray-500">No rewards yet!</p>
            ) : (
              purchasedItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 shadow-md rounded-lg flex justify-between items-center border border-gray-100 hover:shadow-lg transition-all duration-300 ${
                    item.isRedeemed ? "bg-green-100" : "bg-white"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">{item.iconId}</span>
                    <div>
                      <h2 className="text-lg font-medium text-gray-800">{item.name}</h2>
                      <p className="text-gray-600">
                        {item.isRedeemed ? "Redeemed" : "Ready to Redeem"}
                      </p>
                    </div>
                  </div>
                  {!item.isRedeemed && (
                    <button
                      className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
                      onClick={() => setModal({ show: true, type: "redeem", item })}
                      disabled={loading}
                    >
                      Redeem
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-4/5 max-w-md">
            {modal.type === "buy" && modal.item && (
              <>
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Confirm Purchase: {modal.item.name}
                </h2>
                <p className="text-gray-600 mb-6">
                  Price: {modal.item.price} Coins
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    onClick={() => setModal({ show: false, type: "", item: null })}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200"
                    onClick={() => {
                      handlePurchase(modal.item);
                      setModal({ show: false, type: "", item: null });
                    }}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Confirm"}
                  </button>
                </div>
              </>
            )}
            {modal.type === "redeem" && modal.item && (
              <>
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Redeem Reward: {modal.item.name}
                </h2>
                <p className="text-gray-600 mb-6">This action cannot be undone.</p>
                <div className="flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    onClick={() => setModal({ show: false, type: "", item: null })}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                    onClick={() => {
                      handleRedeem(modal.item.id);
                      setModal({ show: false, type: "", item: null });
                    }}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Confirm"}
                  </button>
                </div>
              </>
            )}
            {modal.type === "success" && (
              <>
                <h2 className="text-lg font-semibold mb-4 text-green-700">Purchase Successful!</h2>
                <p className="text-gray-600 mb-6">
                  Your reward has been added to the redeem tab.
                </p>
                <button
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 mx-auto block"
                  onClick={() => setModal({ show: false, type: "", item: null })}
                >
                  Close
                </button>
              </>
            )}
            {modal.type === "error" && (
              <>
                <h2 className="text-lg font-semibold mb-4 text-red-600">Error</h2>
                <p className="text-gray-600 mb-6">
                  {modal.message || "An error occurred"}
                </p>
                <button
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 mx-auto block"
                  onClick={() => setModal({ show: false, type: "", item: null })}
                >
                  Close
                </button>
              </>
            )}
            {modal.type === "redeemed" && (
              <>
                <h2 className="text-lg font-semibold mb-4 text-green-700">Reward Redeemed!</h2>
                <p className="text-gray-600 mb-6">Enjoy your reward!</p>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 mx-auto block"
                  onClick={() => setModal({ show: false, type: "", item: null })}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChildShopRedeem;