import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import TelaDeJogo from '../pages/TelaDeJogo';
import TelaDeConfiguracoes from '../pages/TelaDeConfiguracoes';
import TelaDeFeedback from '../pages/TelaDeFeedback';
import TelaDeRanking from '../pages/TelaDeRanking';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact patch="/telaDeConfiguracoes" component={ TelaDeConfiguracoes } />
    <Route exact patch="/telaDeJogo" component={ TelaDeJogo } />
    <Route exact patch="/telaDeFeedback" component={ TelaDeFeedback } />
    <Route exact patch="/telaDeRanking" component={ TelaDeRanking } />
  </Switch>
);

export default Routes;
