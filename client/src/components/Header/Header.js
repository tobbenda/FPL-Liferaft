import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import buoy from '../../utils/images/buoy.png';

const Header = () => {
  return (
    <div className="header"> 
      <div className="link-container">
        <Link to='/'>
          <div className='home hdr-link'>Home</div>
        </Link>
        <Link to='/myteam'>
          <div className='team hdr-link'>Team</div>
        </Link>
      </div>
      <img alt="life-buoy" className="buoy" src={buoy}></img>
      <h1 className="header-txt"> Fantasy Liferaft </h1>
    </div>
  )
}

export default Header;