import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { score } = this.props;
    return (
      <header>
        <h1>Player Info</h1>
        <img
          data-testid="header-profile-picture"
          src={ localStorage.email }
          alt={ localStorage.username }
        />
        <h2 data-testid="header-player-name">{localStorage.username}</h2>
        <span>Placar:</span>
        <h2 data-testid="header-score">{score}</h2>
      </header>
    );
  }
}

Header.propTypes = {
  score: PropTypes.number.isRequired,
};
export default Header;
