import React from 'react';
import './SideBar.css'; 
import Logo from '../assets/ZAP_QUEST.png';
import LogoutModal from './logout_modal';



function SideBar() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  const [showModal, setShowModal] = React.useState(false);

  const handleLogout = () => {
    setShowModal(false);
    // 添加登出逻辑
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
        <li onClick={() => setShowModal(true)}><a href="#"><i className="fas fa-right-from-bracket"></i>
          Log out</a>
          </li>
      </ul>

        <LogoutModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => handleLogout()}
        title="Log out"
        message="Are you sure you want to log out ?"
          />
    </div>
  );

}

export default SideBar;