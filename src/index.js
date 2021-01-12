import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';
import * as serviceWorker from './serviceWorker';
import storeConfig from './store';

ReactDOM.render(
  <Provider store={ storeConfig() }>
    <BrowserRouter history={ createBrowserHistory() }>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
