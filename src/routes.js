import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SetPage from './pages/SetPage';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ LoginPage } />
      <Route path="/settings" component={ SetPage } />
    </Switch>
  </BrowserRouter>
);

export default Routes;
