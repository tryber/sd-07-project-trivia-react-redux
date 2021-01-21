import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import FeedBack from './pages/FeedBack';
import Ranking from './pages/Ranking';
import './App.css';

export default function App() {
  return (
    <Switch className="App">
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/feedback" component={ FeedBack } />
      <Route exact path="/ranking" component={ Ranking } />
    </Switch>
  );
}
