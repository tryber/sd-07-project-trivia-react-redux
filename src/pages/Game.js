import React, { Component } from 'react';
import Header from '../components/Header';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Token da requisição</h1>
        {localStorage.token}
      </div>
    );
  }
}

export default Game;
