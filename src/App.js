import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Game from './pages/Game';
import Config from './pages/Config';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/ranking" component={ Ranking } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/config" component={ Config } />
    </Switch>
  );
}
