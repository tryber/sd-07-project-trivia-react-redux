import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login, Game, Config, Feedback, Ranking, NotFound } from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/ranking" component={ Ranking } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/config" component={ Config } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/" component={ Login } />
      <Route path="/404" component={ NotFound } />
      <Redirect to="/404" />
    </Switch>
  );
}

export default App;
