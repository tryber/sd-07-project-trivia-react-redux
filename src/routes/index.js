import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
