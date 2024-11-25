import React, { useState } from "react";
import "./Task.css";
import coin from "../../assets/coin.png"

function Task({title,price,onEdit, onDelete }){

    return(
        <div className="task">
            <p className = "avatar">🍦</p>
            <h4 className="title1">{title}</h4>
            <p className="price">{"Price: "+price}</p>
            <img  className = "coin" src = {coin} />
            <div className="post-actions">
                <button className="delete-button" onClick={onDelete} >
                   Delete
                </button>
                <button className="edit-button" onClick={onEdit}>
                   Edit
                </button>
            </div>
        </div>
    );
}

export default Task;