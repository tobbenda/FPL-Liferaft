import './App.css';
import Main from './Main';
import Team from './components/Team/Team';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


import React, { createContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const myContext = createContext();

function App() {

   return (
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
  );
}

export default App;
