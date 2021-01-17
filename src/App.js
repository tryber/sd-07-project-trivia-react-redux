import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Game, Login, Ranking, Settings, Feedback, EndGame } from './pages';
import './App.css';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/settings" component={ Settings } />
        <Route path="/endgame" component={ EndGame } />
      </Switch>
    </div>
  );
}
