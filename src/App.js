import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, GameScreen } from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/gamescreen" component={ GameScreen } />
    </Switch>
  );
}

export default App;
