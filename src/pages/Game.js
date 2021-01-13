import React, { Component } from 'react';

class Game extends Component {
  render() {
    return (
      <div>
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
        <h1>Token da requisição</h1>
        {localStorage.token}
      </div>
    );
  }
}

export default Game;
