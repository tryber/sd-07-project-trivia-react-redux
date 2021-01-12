import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Config } from './pages';

function App() {
  return (
    <Switch>
      <Route path="/config" component={ Config } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
