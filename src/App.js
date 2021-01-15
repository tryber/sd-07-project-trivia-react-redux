import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Login from './pages/Logins';
import Game from './pages/Game';
import Rank from './pages/Ranking';
import Config from './pages/Config';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/ranking" component={ Rank } />
        <Route path="/config" component={ Config } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    </Router>
  );
}
