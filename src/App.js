import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import GamePage from './components/GamePage';
import Settings from './components/Settings';
import Feedback from './components/Feedback';
import Ranking from './components/Ranking';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <div className="App">
      <div className="App-page">
        <Switch>
          <Route path="/gamepage" component={ GamePage } />
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ Settings } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/ranking" component={ Ranking } />
        </Switch>
      </div>
    </div>
  );
}
