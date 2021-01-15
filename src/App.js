import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, GameScreen, Settings, FeedBack } from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/gamescreen" component={ GameScreen } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ FeedBack } />

    </Switch>
  );
}

export default App;
