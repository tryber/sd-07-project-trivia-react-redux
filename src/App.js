import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={ Login } exact />
        <Route path="/game" component={ Game } />
      </Switch>
    </div>
  );
}
