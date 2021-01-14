import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import { Settings, LoginPage, Game, Feedback } from './pages';
import store from './store';

export default function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route path="/settings" component={ Settings } />
          <Route exact path="/" component={ LoginPage } />
          <Route exact path="/game" component={ Game } />
          <Route exact path="/feedback" component={ Feedback } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
