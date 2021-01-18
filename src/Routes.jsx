import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Play from './pages/Play';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/play" component={ Play } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}

export default Routes;
