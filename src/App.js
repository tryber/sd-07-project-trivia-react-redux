import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={ Login } exact />
        <Route path="/settings" component={ Settings } exact />
      </Switch>
    </div>
  );
}
