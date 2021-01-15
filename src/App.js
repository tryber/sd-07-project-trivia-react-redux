import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

import GamePage from './pages/GamePage';

import Ranking from './pages/Ranking';

import Settings from './pages/Settings';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={ Login } exact />
        <Route path="/game" component={ GamePage } exact />
        <Route path="/feedback" component={ Feedback } exact />
        <Route path="/ranking" component={ Ranking } exact />
        <Route path="/settings" component={ Settings } exact />
      </Switch>
    </div>
  );
}
