import React from 'react';
import Header from '../components/Header';
import Questions from './Questions';

class Game extends React.Component {
  render() {
    return (
      <div>
        Página do Jogo
        <Header />
        <Questions />
      </div>
    );
  }
}

export default Game;
