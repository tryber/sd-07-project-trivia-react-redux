import React, { Component } from 'react';
import Header from '../../components/Header';
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
