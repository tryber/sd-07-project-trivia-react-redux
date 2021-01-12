import React from 'react';
import Header from '../components/header';
import Questions from '../components/questions';

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
