import React, { Component } from 'react';
import GridQuestions from './GridQuestions';
import Header from './Header';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <GridQuestions />
      </div>
    );
  }
}

export default Game;
