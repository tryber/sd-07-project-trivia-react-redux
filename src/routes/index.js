import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import GameScreen from '../pages/GameScreen';
import Settings from '../pages/Settings';
import FeedBack from '../pages/FeedBack';

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" component={ GameScreen } />
          <Route path="/settings" component={ Settings } />
          <Route path="/feedback" component={ FeedBack } />
        </Switch>
      </BrowserRouter>
    );
  }
}
