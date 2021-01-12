import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { player } = this.props;
    const hash = () => md5(player.gravatarEmail.trim().toLowerCase());
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}?s=20` }
          data-testid="header-profile-picture"
          alt="profile"
        />
        <p data-testid="header-player-name">{ player.name }</p>
        <p data-testid="header-score">{ player.score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Header);
