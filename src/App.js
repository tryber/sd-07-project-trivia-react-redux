import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './Pages/Login';
import Settings from './Pages/Settings';
import Game from './Pages/Game';
import Feedback from './Pages/Feedback';
import Ranking from './Pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
      </header>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/rank" component={ Ranking } />
      </Switch>
    </div>
  );
}
