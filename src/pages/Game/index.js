import React, { Component } from 'react';
import components from '../../components';

class Game extends Component {
  render() {
    return (
      <>
        <components.Header />
        <components.GameQuestions />
      </>
    );
  }
}

export default Game;
