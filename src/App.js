import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component="Tela de Login" />
      </Switch>
    </div>
  );
}
