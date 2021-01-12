import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import GamePage from './pages/GamePage';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
        <Route path="/game" component={ GamePage } />
      </Switch>
    </div>
  );
}
