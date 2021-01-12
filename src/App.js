import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, GameScreen, Settings } from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/gamescreen" component={ GameScreen } />
      <Route path="/settings" component={ Settings } />

    </Switch>
  );
}

export default App;
