import React from 'react';
import Questions from './Questions';
import Header from '../components/header';

class Game extends React.Component {
  componentDidMount() {
    const player = {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
    localStorage.setItem('state', JSON.stringify({ player }));
  }

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
