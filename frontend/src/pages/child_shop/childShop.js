import React, { useState } from "react";

function ChildShopRedeem() {
  const [activeTab, setActiveTab] = useState("shop");
  const [coins, setCoins] = useState(10);
  const [shopItems] = useState([
    { id: 1, name: "Toy Car", price: 5 },
    { id: 2, name: "Chocolate", price: 3 },
    { id: 3, name: "Book", price: 8 },
  ]);
  const [rewards, setRewards] = useState([]);
  const [modal, setModal] = useState({ show: false, type: "", item: null });

  const handlePurchase = (item) => {
    if (coins >= item.price) {
      setCoins(coins - item.price);
      setRewards([...rewards, { ...item, redeemed: false }]);
      setModal({ show: true, type: "success", item: null });
    } else {
      setModal({ show: true, type: "error", item: null });
    }
  };

  const handleRedeem = (itemId) => {
    setRewards(
      rewards.map((item) =>
        item.id === itemId ? { ...item, redeemed: true } : item
      )
    );
    setModal({ show: true, type: "redeemed", item: null });
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

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "shop" && (
          <div className="space-y-4">
            {shopItems.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div>
                  <h2 className="text-lg font-medium text-gray-800">{item.name}</h2>
                  <p className="text-gray-600">Price: {item.price} Coins</p>
                </div>
                <button
                  className="px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                  onClick={() => setModal({ show: true, type: "buy", item })}
                >
                  Buy
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "redeem" && (
          <div className="space-y-4">
            {rewards.length === 0 ? (
              <p className="text-center text-gray-500">No rewards yet!</p>
            ) : (
              rewards.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 shadow-md rounded-lg flex justify-between items-center border border-gray-100 hover:shadow-lg transition-all duration-300 ${
                    item.redeemed ? "bg-green-100" : "bg-white"
                  }`}
                >
                  <div>
                    <h2 className="text-lg font-medium text-gray-800">{item.name}</h2>
                    <p className="text-gray-600">
                      {item.redeemed ? "Redeemed" : "Ready to Redeem"}
                    </p>
                  </div>
                  {!item.redeemed && (
                    <button
                      className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                      onClick={() => setModal({ show: true, type: "redeem", item })}
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
                  >
                    Confirm
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
                  >
                    Confirm
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
                <h2 className="text-lg font-semibold mb-4 text-red-600">Insufficient Coins</h2>
                <p className="text-gray-600 mb-6">
                  You do not have enough coins to buy this item.
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