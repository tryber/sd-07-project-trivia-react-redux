import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SetPage from './pages/SetPage';
import GamePage from './pages/GamePage';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ LoginPage } />
      <Route path="/settings" component={ SetPage } />
      <Route path="/game" component={ GamePage } />
    </Switch>
  </BrowserRouter>
);

export default Routes;
