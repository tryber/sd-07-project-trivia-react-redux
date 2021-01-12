import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { playerProps } = this.props;
    const hashLink = `https://www.gravatar.com/avatar/${playerProps.hash}`;
    return (
      <header>
        <img data-testid="header-profile-picture" alt="jogador" src={ hashLink } />
        <h3 data-testid="header-player-name">{playerProps.name}</h3>
        <h2 data-testid="header-score">{playerProps.score}</h2>
      </header>
    );
  }
}

Header.propTypes = {
  playerProps: PropTypes.objectOf.isRequired,
};

const mapStateToProps = (state) => ({
  playerProps: state.player,
});

export default connect(mapStateToProps)(Header);
