import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

import './index.css';

class Header extends Component {
  render() {
    const { player } = this.props;
    const { gravatarEmail, name, score } = player;
    const hash = () => md5(gravatarEmail.trim().toLowerCase());

    return (
      <header className="header__container">
        <div className="header__profile">
          <img
            src={ `https://www.gravatar.com/avatar/${hash}?s=36` }
            data-testid="header-profile-picture"
            alt="profile"
          />
          <p data-testid="header-player-name">{ `Jogador: ${name}` }</p>
        </div>
        <p className="header__score" data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Header.propTypes = {
  player: PropTypes.shape({
    gravatarEmail: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
