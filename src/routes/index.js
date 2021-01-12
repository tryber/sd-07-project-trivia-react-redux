import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Game, FeedBack, Settings } from '../pages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/game" component={ Game } />
    <Route exact path="/feedback" component={ FeedBack } />
    <Route exact path="/settings" component={ Settings } />
  </Switch>
);
export default Routes;
