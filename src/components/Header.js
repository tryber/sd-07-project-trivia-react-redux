import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
          <h1>Player Info</h1>
          <img
            data-testid="header-profile-picture"
            src={ localStorage.email }
            alt={ localStorage.username }
          />
          <h2 data-testid="header-player-name">{localStorage.username}</h2>
          <h2>
            Placar:
            <span data-testid="header-score">0</span>
          </h2>
      </header>
    )
  }
}

export default Header;
