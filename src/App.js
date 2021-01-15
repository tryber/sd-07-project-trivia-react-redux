import React from 'react';
import { Provider } from 'react-redux';
// import logo from './trivia.png';
// import './App.css';
import Routes from './routes';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={ store }>
      <Routes />
    </Provider>
  );
}
