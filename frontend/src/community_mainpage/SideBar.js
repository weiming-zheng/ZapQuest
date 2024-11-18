import React from 'react';
import './SideBar.css'; 
function SideBar() {
  return (
    <div className="sidebar">
      <ul>
        <li><a href="#">menu1</a></li>
        <li><a href="#">menu2</a></li>
        <li><a href="#">menu3</a></li>
        <li><a href="#">settings</a></li>
      </ul>
    </div>
  );

}

export default SideBar;