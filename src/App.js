import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feedbacks from './pages/Feedbacks';
import Ranking from './pages/Ranking';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
        <Route path="/game" component={ Game } />
        <Route path="/feedbacks" component={ Feedbacks } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}

export default App;
