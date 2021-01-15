import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Game, Setting, Feedback, Login, Ranking } from '../pages';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/game" component={ Game } />
      <Route exact path="/setting" component={ Setting } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/ranking" component={ Ranking } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
