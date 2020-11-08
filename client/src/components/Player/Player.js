import React from 'react';
import './Player.css';
import { Link } from 'react-router-dom';

const Player = props => {
  const {data, image} = props;
  return (
    <div className={`player team-pos-${data.teamPosition}`} > 
      <img className="player-img" src={image} alt="shirt"></img>
      <p className="player-name">{data.web_name}</p>
    </div>
  )
}

export default Player;
// img, purchase-price, sell-price, pos, is-captain