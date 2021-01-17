import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import TelaDeJogo from '../pages/TelaDeJogo';
import TelaDeConfiguracoes from '../pages/TelaDeConfiguracoes';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route path="/telaDeConfiguracoes" component={ TelaDeConfiguracoes } />
    <Route path="/telaDeJogo" component={ TelaDeJogo } />
  </Switch>
);

export default Routes;
