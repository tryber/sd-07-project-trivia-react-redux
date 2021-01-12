import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import GamePage from './components/GamePage';
import Settings from './components/Settings';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/gamepage" component={GamePage} />
        <Route exact path="/" component={Login} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </div>
  );
}
