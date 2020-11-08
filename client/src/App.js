import './App.css';
import Main from './Main';
import Team from './components/Team/Team';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
const sortOptions = [
  { attributeID: "web_name", prettyName: "Short Name", checked: true },
  { attributeID: "total_points", prettyName: "Total Points", checked: true },
  { attributeID: "first_name", prettyName: "First name", checked: false },
  { attributeID: "second_name", prettyName: "Second name", checked: true },
  { attributeID: "points_per_game", prettyName: "Points pr game", checked: true },
  { attributeID: "form", prettyName: "Form", checked: true },
  { attributeID: "now_cost", prettyName: "Current Price", checked: true },
  { attributeID: "points_pr_mill", prettyName: "Points pr mill", checked: true },
  { attributeID: "points_pr_game_pr_mill", prettyName: "Points pr game pr mill", checked: true },
  { attributeID: "team_name", prettyName: "Team", checked: true },
  { attributeID: "position", prettyName: "Position", checked: true },
  { attributeID: "goals_scored", prettyName: "Goals scored", checked: false },
  { attributeID: "assists", prettyName: "Assists", checked: false },
  { attributeID: "clean_sheets", prettyName: "Clean sheets", checked: false },
  { attributeID: "minutes", prettyName: "Minutes played", checked: true },
  { attributeID: "cost_change_start", prettyName: "Total price change", checked: false },
  { attributeID: "event_points", prettyName: "Points last GW", checked: false },
  { attributeID: "goals_conceded", prettyName: "Goals conceded", checked: false },
  { attributeID: "news", prettyName: "News", checked: true },
  { attributeID: "selected_by_percent", prettyName: "Selected by percent", checked: false },
  { attributeID: "yellow_cards", prettyName: "Yellow cards", checked: false },
  { attributeID: "red_cards", prettyName: "Red cards", checked: false },
  { attributeID: "bonus", prettyName: "Bonus Points", checked: false },
  { attributeID: "penalties_saved", prettyName: "Penalties saved (Goalkeeper)", checked: false },
  { attributeID: "penalties_missed", prettyName: "Penaltes missed", checked: false },
  { attributeID: "saves", prettyName: "Saves (Goalkeeper)", checked: false },
  { attributeID: "ict_index", prettyName: "ICT-Index", checked: false },
  { attributeID: "influence_rank", prettyName: "Influence rank", checked: false },
  { attributeID: "influence_rank_type", prettyName: "Influence rank position", checked: false },
  { attributeID: "creativity_rank", prettyName: "Creativity rank", checked: false },
  { attributeID: "creativity_rank_type", prettyName: "Creativity rank position", checked: false },
  { attributeID: "threat_rank", prettyName: "Threat rank", checked: false },
  { attributeID: "threat_rank_type", prettyName: "Threat rank position", checked: false },
  { attributeID: "ict_index_rank", prettyName: "ICT rank", checked: false },
  { attributeID: "ict_index_rank_type", prettyName: "ICT rank position", checked: false },
  { attributeID: "transfers_in_event", prettyName: "GW transfers in", checked: false },
  { attributeID: "transfers_out_event", prettyName: "GW trannsfers out", checked: false },
  { attributeID: "value_form", prettyName: "Value form (?)", checked: false },
  { attributeID: "status", prettyName: "Status", checked: false },
]

export const myContext = createContext();

function App() {
  const [playerData, setPlayerData] = useState([]);
  const [checkValues, setCheckValues] = useState(sortOptions);
  const [posFilter, setPosFilter] = useState('All');
  const [sortBy, setSortBy] = useState('total_points');
  const [maxPrice, setMaxPrice] = useState(130);
  const [minPrice, setMinPrice] = useState(38);

  const getCheckedAttributesQuery = () => {
    const checkedAttributes = checkValues.filter(el => el.checked === true).map(attr => attr.attributeID).join(' ');
    return checkedAttributes
  }

  // Ideas to build out the query (and graphql server):
  // ASC/DESC
  // Filter on price
  // nr of hits (default 20?)
  const getQuery = () => {
    return `query {
      getPlayersSorted2(filter:"${posFilter}", sort:"${sortBy}", maxPrice:${maxPrice}, minPrice:${minPrice}){
        ${getCheckedAttributesQuery()}
      }
    }`
  }

  const getData = async () => {
    await fetch("http://localhost:4001/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: getQuery(),
      }),
    })
      .then((r) => r.json())
      .then((data) => setPlayerData(data.data.getPlayersSorted2));
  };

  const submitHandler = () => {
    getData();
  };

   return (
    <myContext.Provider value={ 
      {
        playerData,
        checkValues,
        setCheckValues,
        posFilter,
        setPosFilter,
        setSortBy,
        submitHandler,
        setMaxPrice,
        setMinPrice,
      }
     } >
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path='/' component={Main} />
            <Route path='/myteam' component={Team} />
          {/* <Main /> */}
          </Switch>
          <Footer />
        </div>
      </Router>
    </myContext.Provider>
  );
}

export default App;
