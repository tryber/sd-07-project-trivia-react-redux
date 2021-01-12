import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { playerNameProps } = this.props;
    return (
      <header>
        <img data-testid="header-profile-picture" alt="jogador" src="#" />
        <h3 data-testid="header-player-name">{ playerNameProps }</h3>
        <h2 data-testid="header-score">Score</h2>
      </header>
    );
  }
}

Header.propTypes = {
  playerNameProps: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  playerNameProps: state.player.name,
});

export default connect(mapStateToProps)(Header);
