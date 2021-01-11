import React from 'react';
import logo from './trivia.png';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <div>
          <Switch>
            <Route exact path="/" component={ Login } />
          </Switch>
        </div>
      </header>
    </div>
  );
}
