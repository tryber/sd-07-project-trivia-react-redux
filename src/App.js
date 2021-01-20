import { Switch, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/settings" component={ Settings } />
          <Route exact path="/game" component={ Game } />
          <Route exact path="/feedback" component={ Feedback } />
          <Route exact path="/ranking" component={ Ranking } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </header>
    </div>
  );
}
