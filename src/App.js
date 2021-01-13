import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Ranking from './pages/Ranking';
import Login from './pages/Login';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/ranking" component={ Ranking } />
        </Switch>
      </div>
    );
  }
}

export default App;
