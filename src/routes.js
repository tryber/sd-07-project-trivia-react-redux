import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ LoginPage } />
    </Switch>
  </BrowserRouter>;
);

export default Routes;
