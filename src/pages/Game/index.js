import React, { Component } from 'react';
import { Header, GameQuestions } from '../../components';

class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <GameQuestions />
      </>
    );
  }
}

export default Game;
