import React, { useContext } from 'react';
import { myContext } from '../../App';
import './Player.css';
import { Link } from 'react-router-dom';

const Player = (props) => {
  const { playerData } = useContext(myContext);
  console.log({ playerData });
  const { data, image } = props;
  console.log({ data });
  return (
    <div className={`player team-pos-${data.teamPosition}`}>
      <img className="player-img" src={image} alt="shirt"></img>
      <p className="player-name">
        {data.web_name}:{' '}
        {playerData ? playerData.find((el) => el.id === data.id).rank : ''}%,
        Rank: {data.top_ownage}
      </p>
    </div>
  );
};

export default Player;
// img, purchase-price, sell-price, pos, is-captain
