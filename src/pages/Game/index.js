import React, { Component } from 'react';
import Header from './header';
import Questions from './Questions';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}

export default Game;
