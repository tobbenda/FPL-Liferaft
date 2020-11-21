import React, {useState, useEffect, useContext} from 'react';
import './TeamDisplay.css';
import Player from '../Player/Player';
import generic_shirt from './images/shirts/generic.webp';
import Arsenal from './images/shirts/Arsenal.webp';
import Aston_Villa from './images/shirts/Aston_Villa.webp';
import Brighton from './images/shirts/Brighton.webp';
import Burnley from './images/shirts/Burnley.webp';
import Chelsea from './images/shirts/Chelsea.webp';
import Crystal_Palace from './images/shirts/Crystal_Palace.webp';
import Everton from './images/shirts/Everton.webp';
import Fulham from './images/shirts/Fulham.webp';
import Leeds from './images/shirts/Leeds.webp';
import Leicester from './images/shirts/Leicester.webp';
import Liverpool from './images/shirts/Liverpool.webp';
import Man_Utd from './images/shirts/Man_Utd.webp';
import Newcastle from './images/shirts/Newcastle.webp';
import Sheffield_Utd from './images/shirts/Sheffield_Utd.webp';
import Southampton from './images/shirts/Southampton.webp';
import Spurs from './images/shirts/Spurs.webp';
import West_Brom from './images/shirts/West_Brom.webp';
import West_Ham from './images/shirts/West_Ham.webp';
import Wolves from './images/shirts/Wolves.webp';
import { myContext } from '../../App';

const TeamDisplay = props => {
  const {checkValues, setCheckValues, setPosFilter, setSortBy, submitHandler, setMaxPrice, setMinPrice} = useContext(myContext);
  const [plainPlayers, setPlainPlayers] = useState([])
  const { loginPlayerData } = props;

  const getQuery = (elements) => {
    return `query {
      getPlayersByIds(elements:"[${elements.toString()}]"){
        web_name,
        position,
        team_name,
        team,
        id,
        top_ownage,
      }
    }`
  }

  const getData = async (players) => {
    await fetch("http://localhost:4001/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: getQuery(players),
      }),
    })
      .then((r) => r.json())
      .then((data) =>  {
        return data.data.getPlayersByIds;
      }).then(data => {
        data.forEach(element => {
          element.teamPosition = loginPlayerData.find(el => el.element === element.id).position;
        });
        return data;
      })
      .then(data => setPlainPlayers(data));
  };

  const getTeamPlayerData = () => {
    if(loginPlayerData){
      const playerIDs = loginPlayerData.map(player => {
        return player.element;
      });
      getData(playerIDs);
    }
  }

  const getImg = (team)  => {
    switch (team) {
      case 'Arsenal': 
        return Arsenal;
      case 'Aston Villa':
        return Aston_Villa;
      case 'Brighton':
        return Brighton;
      case 'Burnley': 
        return Burnley;
      case 'Chelsea':
        return Chelsea;
      case 'Crystal Palace':
        return Crystal_Palace;
      case 'Everton':
        return Everton;
      case 'Fulham': 
        return Fulham;
      case 'Leeds':
        return Leeds;
      case 'Leicester':
        return Leicester;
      case 'Liverpool': 
        return Liverpool;
      case 'Man Utd':
        return Man_Utd;
      case 'Newcastle':
        return Newcastle;
      case 'Sheffield Utd': 
        return Sheffield_Utd;
      case 'Southampton':
        return Southampton;
      case 'Spurs': 
        return Spurs;
      case 'West Brom':
        return West_Brom;
      case 'West Ham':
        return West_Ham;
      case 'Wolves': 
        return Wolves;
      default:
        console.log('Error with getImg (TeamDisplay) switch statement');
        return generic_shirt;
    }
  }
  useEffect(() => {
    getTeamPlayerData();
  }, [loginPlayerData])

  const isSubstitute = (teamPos) => {
    return [12,13,14,15].includes(teamPos)
  }

  return (
    <div className="team-display"> 
      <div className="pitch">
        {/* <button onClick={getTeamPlayerData}>TEST</button> */}
        <div className="playerRow gkp-row">
          {plainPlayers?plainPlayers.filter((el) => el.position === 'Goalkeeper' && !isSubstitute(el.teamPosition)).map((el) => <Player image={getImg(el.team_name)} data={el} />):''}
        </div>
        <div className="playerRow def-row">
          {plainPlayers?plainPlayers.filter((el) => el.position === 'Defence' && !isSubstitute(el.teamPosition)).map((el) => <Player image={getImg(el.team_name)} data={el} />):''}
        </div>
        <div className="playerRow mid-row">
          {plainPlayers?plainPlayers.filter((el) => el.position === 'Midfielder' && !isSubstitute(el.teamPosition)).map((el) => <Player image={getImg(el.team_name)} data={el} />):''}
        </div>
        <div className="playerRow fwd-row">
          {plainPlayers?plainPlayers.filter((el) => el.position === 'Attacker' && !isSubstitute(el.teamPosition)).map((el) => <Player image={getImg(el.team_name)} data={el} />):''}
        </div>
        <div className="playerRow sub-row">
          {plainPlayers?plainPlayers.filter((el) => isSubstitute(el.teamPosition)).map((el) => <Player className="sub" image={getImg(el.team_name)} data={el} />):''}
        </div>
        {/* <img alt="soccer-pitch" src={pitch}></img> */}
      </div>
    </div>
  )
}

export default TeamDisplay;