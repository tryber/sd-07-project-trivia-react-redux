import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Game from './Pages/Game';
import Settings from './Pages/Settings';
import Feedback from './Pages/Feedback';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
  );
}
