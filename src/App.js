import React from 'react';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import { Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route to='/' component={Login}/>
      </Switch>
    </div>
  );
}
