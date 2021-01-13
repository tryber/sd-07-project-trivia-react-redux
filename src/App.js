import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './Pages/Login';
import Settings from './Pages/Settings';
import PlayGame from './Pages/PlayGame';
import Store from './Store';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Provider store={ Store }>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/settings" component={ Settings } />
            <Route path="/game" component={ PlayGame } />
          </Switch>
        </Provider>
      </BrowserRouter>
    </div>
  );
}
