import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, Config, Game } from './pages';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/config" component={ Config } />
      <Route path="/game" component={ Game } />
    </Switch>
  </BrowserRouter>
);

export default Routes;
