import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
// https://github.com/brix/crypto-js
// md5 gera as hash para add no fim do link de acordo com o email do user.

class Header extends Component {
  render() {
    const { email, nome, score } = this.props;

    return (
      <header className="header">
        <div className="perfil">
          {' '}
          <img
            src={ `https://www.gravatar.com/avatar/${md5(email)}` }
            className="App-logo"
            alt="logo"
            data-testid="header-profile-picture"
          />
        </div>
        <div className="player">
          <p data-testid="header-player-name">
            { nome }
          </p>
        </div>
        <div className="Score">
          <span>Pontuação: </span>
          <p data-testid="header-score">
            { score }
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  nome: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
