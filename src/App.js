import { Switch, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route path="/settings" component={ Settings } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </header>
    </div>
  );
}
