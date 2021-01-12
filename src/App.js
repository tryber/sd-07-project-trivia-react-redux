import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Settings from './Pages/Settings';
import User from './Components/User';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/user" component={ User } />
          <Route path="/settings" component={ Settings } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
