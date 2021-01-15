import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import GameScreen from '../pages/GameScreen';
import Settings from '../pages/Settings';
import FeedBack from '../pages/FeedBack';
import Ranking from '../pages/Ranking';

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" component={ GameScreen } />
          <Route path="/settings" component={ Settings } />
          <Route path="/feedback" component={ FeedBack } />
          <Route path="/ranking" component={ Ranking } />
        </Switch>
      </BrowserRouter>
    );
  }
}
