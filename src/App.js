import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Settings from './pages/Settings';
import QuestionsPage from './pages/QuestionsPage';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/questions-page" component={ QuestionsPage } />
      </Switch>
    </div>
  );
}
