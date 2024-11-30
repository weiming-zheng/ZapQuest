import React from "react";
import "./RedeemList.css";
import coin from "../../assets/coin.png"

function RedeemList({title,price,isRedeemed,onRedeem }){
    return(
        <div className="redeemed">
            <p className = "avatar">🍦</p>
            <h4 className="title1">{title}</h4>
            <p className="price">{"Price: "+price}</p>
            <img  className = "coin" src = {coin} />
            <div className="post-actions">
                <button className={`btn ${isRedeemed ? "redeemed-btn" : "redeem-btn"}`} onClick={onRedeem} disabled={isRedeemed} >
                  {isRedeemed ? 'Redeemed' : 'Redeem'} 
                </button>
            </div>
        </div>
    );
}

export default RedeemList;