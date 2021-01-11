import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, Config } from './pages';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/config" component={ Config } />
    </Switch>
  </BrowserRouter>
);

export default Routes;
