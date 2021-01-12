import React, { Component } from 'react';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { imgSource, playerName, playerScore } = this.props;
    return (
      <header>
        <div className="avatar-container">
          <img
            src={ imgSource }
            alt={ playerName }
            data-testid="header-profile-picture"
          />
        </div>
        <div className="name-container">
          <p data-testid="header-player-name">
            { playerName }
          </p>
        </div>
        <div className="score-container">
          <p data-testid="header-score">
            { playerScore }
          </p>
        </div>
      </header>
    );
  }
}

export default Header;

Header.propTypes = {
  src: propTypes.string,
  name: propTypes.string,
  score: propTypes.number,
}.isRequired;
