import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';

export default function App() {
  return (
    <div className="App">
      <Route path="/" component={ Login } />
    </div>
  );
}
