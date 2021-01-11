import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './Pages/Login'

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
      </header>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
