import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Configurations from './pages/Configurations';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/config" component={ Configurations } />
        <Route exact to="/" component={ Login } />
      </Switch>
    </div>
  );
}
