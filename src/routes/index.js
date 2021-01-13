import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Game from '../pages/Game';
import Settings from '../pages/Settings';
import Feedback from '../pages/Feedback';
import Ranking from '../pages/Ranking';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/jogo" component={ Game } />
    <Route path="/config" component={ Settings } />
    <Route path="/feedback" component={ Feedback } />
    <Route path="/ranking" component={ Ranking } />
  </Switch>
);

export default Routes;
