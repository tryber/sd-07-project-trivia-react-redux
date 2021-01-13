import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Trivia from './pages/Trivia';
import FeedBack from './pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ Settings } />
          <Route path="/trivia" component={ Trivia } />
          <Route path="/feedback" component={ FeedBack } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
