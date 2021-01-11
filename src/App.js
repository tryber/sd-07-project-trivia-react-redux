import React from 'react';
import logo from './trivia.png';
import './App.css';
import api from './Api';

class App extends React.Component {
  async componentDidMount() {
    const { returnToken, returnAsks } = api;
    const result = await returnToken();
    const ask = await returnAsks(result);
    console.log(ask)
    console.log(result);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
        </header>
      </div>
    );
  }
}

export default App;
