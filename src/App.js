import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
