import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <img data-testid="header-profile-picture" alt="jogador" src="#" />
        <h3 data-testid="header-player-name">Nome do Jogador</h3>
        <h2 data-testid="header-score">Score</h2>
      </header>
    );
  }
}

export default Header;
