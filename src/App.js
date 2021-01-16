import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, GameScreen, Settings, FeedBack, Ranking } from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/gamescreen" component={ GameScreen } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ FeedBack } />
      <Route path="/ranking" component={ Ranking } />

    </Switch>
  );
}

export default App;
