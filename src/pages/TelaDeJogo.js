import React, { Component } from 'react';

export default class TelaDeJogo extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Tela de Jogo</h1>
          <img data-testid="header-profile-picture" />
          <div data-testid="header-player-name">
          </div>
          <div data-testid="header-score ">
          </div>
        </header>
      </div>
    )
  }
}