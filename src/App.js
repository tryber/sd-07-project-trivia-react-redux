import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Settings from './Pages/Settings';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
