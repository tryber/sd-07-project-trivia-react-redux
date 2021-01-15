import React, { Component } from 'react';
import GameScreen from '../../components/GameScreen';
import Header from '../../components/Header';

class GamePage extends Component {
  render() {
    return (
      <>
        <h1>Game Page</h1>
        <GameScreen />
        <Header />
      </>
    );
  }
}

export default GamePage;
