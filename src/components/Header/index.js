import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { playerProps } = this.props;
    return (
      <header>
        <img data-testid="header-profile-picture" alt="jogador" src="#" />
        <h3 data-testid="header-player-name">{ playerProps.name }</h3>
        <h2 data-testid="header-score">Score</h2>
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
