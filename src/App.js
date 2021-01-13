import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Game } from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
    </Switch>
  );
}

export default App;
