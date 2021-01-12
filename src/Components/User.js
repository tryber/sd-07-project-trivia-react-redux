import React, { Component } from 'react';

class User extends Component {
  constructor() {
    super();

    this.state = {
      img: '',
      name: '',
      score: '',
    };
  }

  render() {
    const { img, name, score } = this.state;
    return (
      <div>
        <header>
          <p data-testid="header-profile-picture">{img}</p>
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">{score}</p>
        </header>
      </div>
    );
  }
}

export default User;
