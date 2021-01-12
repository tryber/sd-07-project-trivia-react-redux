import React from 'react';
import Questions from './Questions';
// import Header from '../components/Header';

class Game extends React.Component {
  render() {
    return (
      <div>
        Página do Jogo
        {/* <Header /> */}
        <Questions />
      </div>
    );
  }
}

export default Game;
