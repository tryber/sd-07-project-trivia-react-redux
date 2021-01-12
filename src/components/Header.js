import React from 'react';
import md5 from 'crypto-js/md5';

export default class Header extends React.Component {
  render() {
    const player = JSON.parse(localStorage.getItem('state'));
    const { name, score, gravatarEmail } = player.player;
    const emailConvertido = md5(gravatarEmail);
    const requestGravatar = `https://www.gravatar.com/avatar/${emailConvertido}`;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ requestGravatar }
            alt="perfil Gravatar"
          />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
      </div>
    );
  }
}
