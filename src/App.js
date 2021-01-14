import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import './App.css';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/game" component={Game} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </div>
  );
}
