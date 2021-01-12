import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as pages from './pages';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route path="/feedback" component={ pages.Feedback } />
      <Route exact path="/" component={ pages.Login } />
      <Route path="/settings" component={ pages.Settings } />
      <Route path="/game" component={ pages.Game } />
    </Switch>
  );
}
