import React, { Component } from 'react';
import { Header, Questions } from '../../components';
import './Game.css';

class Game extends Component {
  render() {
    return (
      <div className="game-page">
        <Header />
        <Questions />
      </div>
    );
  }
}

export default Game;
