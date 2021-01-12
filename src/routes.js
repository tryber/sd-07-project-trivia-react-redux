import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ LoginPage } />
      <Route path="/game" component={ GamePage } />
    </Switch>
  </BrowserRouter>
);

export default Routes;
