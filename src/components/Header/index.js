import React from 'react';
import { getStorage } from '../../services';
import './style.css';

class Header extends React.Component {
  renderJogador(player) {
    const {
      name,
      gravatarURL,
    } = player;
    return (
      <div className="header header-left">
        <img
          data-testid="header-profile-picture"
          className="ugly-picture"
          alt={ name }
          src={ gravatarURL }
        />
        <h2 className="header-label">Jogador: </h2>
        <h2 className="header-name" data-testid="header-player-name">{ name }</h2>
      </div>
    );
  }

  renderScore(player) {
    const { score } = player;
    return (
      <div className="header header-right">
        <h2 className="header-label">Pontos: </h2>
        <h2 className="header-name" data-testid="header-score">{ score }</h2>
      </div>
    );
  }

  render() {
    const state = getStorage('state');
    const { player } = state;
    return (
      <header className="header-section">
        {this.renderJogador(player)}
        { this.renderScore(player)}
      </header>
    );
  }
}
export default Header;
