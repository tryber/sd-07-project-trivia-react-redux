import React from 'react';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { email nome score } = this.props
    const md5Email = md5(email).toString();
    const gravatar = `https://www.gravatar.com/avatar/${md5Email}`;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ gravatar }
          alt="imagem de avatar"
        />
        <p data-testid="header-player-name">
          Nome:
          { nome }
        </p>
        <p data-testid="header-score">
          Placar:
          { score }
        </p>
      </header>
    );
  }
}

export default Header;
