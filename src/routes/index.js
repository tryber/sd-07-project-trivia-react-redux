import React from 'react';
import { Switch, Route } from 'react-router-dom';
import pages from '../pages';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/game" component={ pages.Game } />
      <Route exact path="/setting" component={ pages.Setting } />
      <Route exact path="/" component={ pages.Login } />
    </Switch>
  );
}
