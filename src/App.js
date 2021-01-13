import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Config, Feedback, Ranking } from './pages';

function App() {
  return (
    <Switch>
      <Route path="/ranking" component={ Ranking } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/config" component={ Config } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
