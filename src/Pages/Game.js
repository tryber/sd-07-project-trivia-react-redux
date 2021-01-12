import React, { Component } from 'react';
import GameScreen from '../Components/GameScreen';

export default class Game extends Component {
  render() {
    return (
      <div>
        <h1>Tela de Jogo</h1>
        <GameScreen />
      </div>
    );
  }
}
