import React, { useState } from 'react';
import './Team.css';
import SettingsBox from '../SettingsBox/SettingsBox'
import DataBox from '../DataBox/DataBox';
import TeamDisplay from '../TeamDisplay/TeamDisplay';


const Team = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [playerID, setPlayerID] = useState('');
  const [loginTeamData, setLoginTeamData] = useState('');
  const [budget, setBudget] = useState(0);
  const [players, setPlayers] = useState([]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handlePlayerIdChange = (e) => {
    setPlayerID(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
          fetch("http://localhost:4001/myteam", { headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            playerID
          }),
          method: "POST",
      }).then(res => res.body)
      .then(body => {
        let result = [];
        const reader = body.getReader();
        let charsReceived = 0;
        reader.read().then(function processText({ done, value }) {
          console.log({done, value});
          if (done) {
            console.log("Stream complete");
            return;
          }
          
          charsReceived += value.length;
          const chunk = value;
          var string = new TextDecoder("utf-8").decode(chunk);
          result=string;
          const data = JSON.parse(string)
          setBudget(data.transfers.bank)
          setLoginTeamData(data);
        });
      })
      .catch(function(res){ console.log(res) })
  }


  return (
  <div className="team">
    <form className="login-form" onSubmit={handleSubmit}>
      <label className="input-block">
      Email:  
      <input className="email-input login-input" type="text" value={email} onChange={handleEmailChange} autoComplete="email" />
      </label>
        <label className="input-block">
        Password:
        <input className="password-input login-input" type="password" value={password} onChange={handlePasswordChange} autoComplete="current-password"/>
      </label>
      <label className="input-block">
      FPL Player ID:
      <input className="player-id-input login-input" type="text" value={playerID} onChange={handlePlayerIdChange} />
       </label>
      <input className="submit-btn" type="submit" value="Submit" />
    </form>
          <SettingsBox />
    <h1>Team Page</h1>
    <div className="team-display-and-data">
      <TeamDisplay loginPlayerData={loginTeamData.picks}/>
          <DataBox />
    </div>
  </div>
  )
}

export default Team;