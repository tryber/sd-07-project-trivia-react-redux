import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ perfil }
            alt="perfil Gravatá"
          />
          <p
            data-testid="header-player-name"
          >
            { nome }
          </p>
          <p
            data-testid="header-score"
          >
            { placar }
          </p>
        </header>
      </div>
    );
  }
}
