import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import TelaDeJogo from '../pages/TelaDeJogo';
import TelaDeConfiguracoes from '../pages/TelaDeConfiguracoes';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route patch="/tela-de-jogo" component={ TelaDeJogo } />
    <Route patch="/tela-de-configuracoes" component={ TelaDeConfiguracoes } />
  </Switch>
);

export default Routes;
