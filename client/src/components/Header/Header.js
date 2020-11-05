import React from 'react';
import './Header.css';
import buoy from '../../buoy.png'

const Header = () => {
  return (
    <div className="header"> 
    <img alt="life-buoy" className="buoy" src={buoy}></img>
      <h1 className="header-txt"> Fantasy Liferaft </h1>
    </div>
  )
}

export default Header;