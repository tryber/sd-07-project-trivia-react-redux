import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import './App.css';
import Game from './pages/Game';
import Score from './pages/Score';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/Game" component={ Game } />
        <Route exact path="/Score" component={ Score } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
