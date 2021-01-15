import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../images/logo200x200.png';
import './Header.css';

class Header extends Component {
  render() {
    const { playerProps } = this.props;
    const hashLink = `https://www.gravatar.com/avatar/${playerProps.hash}`;
    return (
      <header className="game-header">
        <img src={ logo } alt="Minha imagem de teste" className="image-logo-header" />
        <div className="player-header-information">
          <img data-testid="header-profile-picture" alt="jogador" src={ hashLink } />
          <h3 data-testid="header-player-name">{`Player: ${playerProps.name}` }</h3>
          <h2 data-testid="header-score">{ playerProps.score }</h2>
        </div>
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
