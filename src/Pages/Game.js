import React from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Questions />
      </div>
    )
  }
}

export default Game;