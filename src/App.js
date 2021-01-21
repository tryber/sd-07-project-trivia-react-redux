import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import PlayGame from './pages/PlayGame';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';

import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/playgame" component={ PlayGame } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
  );
}
