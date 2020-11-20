import './App.css';
import Main from './components/Main/Main'
import Team from './components/Team/Team';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {sortOptions} from './utils/helpers/helpers';

export const myContext = createContext();

function App() {
  const [playerData, setPlayerData] = useState([]);
  const [checkValues, setCheckValues] = useState(sortOptions);
  const [posFilter, setPosFilter] = useState('All');
  const [sortBy, setSortBy] = useState('total_points');
  const [maxPrice, setMaxPrice] = useState(130);
  const [minPrice, setMinPrice] = useState(38);
  console.log(playerData);

  const getCheckedAttributesQuery = () => {
    const checkedAttributes = checkValues.filter(el => el.checked === true).map(attr => attr.attributeID).join(' ');
    return checkedAttributes + ' id ';
  }

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
      .then((data) => data.data.getPlayersSorted2)
      .then((data) => {
        const newArr = data.map((el, i) => {
          el.rank=i+1
          return el;
        })
        return newArr;
      })
      .then((data) => setPlayerData(data))
      // .then((data) => setPlayerData(data.data.getPlayersSorted2));
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
