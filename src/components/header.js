import React from 'react';
import userIcon from '../User_icon.png';
import './header.css';

class Header extends React.Component {
  render() {
    return (
      <div>
        <h3>Header</h3>
        <img
          src={ userIcon }
          data-testid="header-profile-picture"
          alt="Avatar do Jogador"
        />
        <span data-testid="header-player-name">Nome do Jogador</span>
        <span>Pontuação:</span>
        <span data-testid="header-score">0</span>
      </div>
    );
  }
}

export default Header;
