import React from 'react';
import Header from '../components/header';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">Texto de feedback placeholder</p>
      </div>
    );
  }
}

export default Game;
