import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Game from '../pages/Game';
import Settings from '../pages/Settings';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/jogo" component={ Game } />
    <Route path="/config" component={ Settings } />
  </Switch>
);

export default Routes;
