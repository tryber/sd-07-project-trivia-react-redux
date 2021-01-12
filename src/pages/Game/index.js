import React, { Component } from 'react';
import Header from './header';
import Questions from './Questions';
import Timer from './Timer';
import './index.css';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <Questions />
        <Timer />
      </div>
    );
  }
}

export default Game;
