import React from 'react';
import './Player.css';
import { Link } from 'react-router-dom';

const Player = props => {
  const {data, image} = props;
  console.log(data.team);
  console.log(data.team_name);
  console.log(`../TeamDisplay/images/shirts/${data.team_name.replace(' ', '_')}.webp`);
  return (
    <div className="player"> 
      <img src={image} alt="shirt"></img>
      <ul>
      <li>{data.web_name}</li>
        <li>{data.position}</li>
        <li>{data.team_name}</li>
      </ul>
      <h1>Player</h1>
    </div>
  )
}

export default Player;
// img, purchase-price, sell-price, pos, is-captain