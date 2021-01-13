import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import Game from './pages/Game';
import Settings from './pages/Settings';
import store from './store';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      <Route exact path="/" component={ App } />
      <Route path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
