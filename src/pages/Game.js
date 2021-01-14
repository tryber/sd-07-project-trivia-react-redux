import React from 'react';
import Question from '../components/question';
import Header from '../components/header';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Question />
      </div>
    );
  }
}

export default Game;
