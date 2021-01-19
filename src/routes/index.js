import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Gamepage from '../pages/Gamepage';
import Settings from '../pages/Settings';
import Feedback from '../pages/Feedback';
import Ranking from '../pages/Ranking';

const Routes = () => (
  <Switch>
    <Route exact path="/ranking" component={ Ranking } />
    <Route exact path="/feedback" component={ Feedback } />
    <Route exact path="/settings" component={ Settings } />
    <Route exact path="/gamepage" component={ Gamepage } />
    <Route exact path="/" component={ Login } />
  </Switch>
);

export default Routes;
