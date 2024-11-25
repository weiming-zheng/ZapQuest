import React from 'react';
import './SideBar.css'; 
import Logo from '../assets/ZAP_QUEST.png'

function SideBar() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="sidebar">
      <img src={Logo} alt="Logo" className="sidebar-logo" />

      <div className="copy-code">
        <span>child login code: </span>
        <span id="code-text">your code</span>
        <button onClick={() => copyToClipboard('your code')}><i className='fa fa-copy'></i></button>
      </div>

      <ul>
        <li><a href="#"><i className='far fa-clock'></i>
          Tasks</a>
          </li>
        <li><a href="#"><i className='far fa-star'></i>
          Rewards</a>
          </li>
        <li><a href="#"><i className="fas fa-user-group"></i>
          Community</a>
          </li>
        <li><a href="#"><i className="fas fa-cog"></i>
          Setting</a>
          </li>
        <li><a href='#'><i className="far fa-bell"></i>
          Notifications</a>
          </li>
      </ul>
    </div>
  );

}

export default SideBar;