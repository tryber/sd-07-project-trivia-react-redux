import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './Pages/Login';
import Settings from './Pages/Settings';
import PlayGame from './Pages/PlayGame';
import Store from './Store';
import Feedback from './Pages/Feedback';
import PlayAgain from './Components/PlayAgain';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Provider store={ Store }>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/settings" component={ Settings } />
            <Route path="/game" component={ PlayGame } />
            <Route path="/feedback" component={ Feedback } />
            <Route exact path="/" component={ PlayAgain } />
          </Switch>
        </Provider>
      </BrowserRouter>
    </div>
  );
}
