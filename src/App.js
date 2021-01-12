import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={ Login } exact />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/settings" component={ Settings } exact />
      </Switch>
    </div>
  );
}
