import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, Config, Game, Feedback, Ranking } from './pages';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/config" component={ Config } />
      <Route path="/game" component={ Game } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  </BrowserRouter>
);

export default Routes;
