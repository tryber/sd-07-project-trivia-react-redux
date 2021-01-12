import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Play from './pages/Play';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import Configuration from './pages/Configuration';

export default () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route path="/play" component={ Play } />
    <Route path="/feedback" component={ Feedback } />
    <Route path="/ranking" component={ Ranking } />
    <Route path="/configuration" component={ Configuration } />
  </Switch>
);
