import React, { Component } from 'react';
import GameScreen from '../Components/GameScreen';
import Header from '../Components/Header';

export default class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Tela de Jogo</h1>
        <GameScreen />
      </div>
    );
  }
}
