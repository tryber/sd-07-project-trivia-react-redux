import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Settings from './Pages/Settings';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ Settings } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
