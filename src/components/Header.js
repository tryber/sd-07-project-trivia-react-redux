import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
// https://github.com/brix/crypto-js
// md5 gera as hash para add no fim do link de acordo com o email do user.

class Header extends Component {
  render() {
    const { email, nome } = this.props;
    const { score } = JSON.parse(localStorage
      .getItem('state')).player;

    return (
      <header className="header">
        <div className="perfil">
          {' '}
          <img src={ `https://www.gravatar.com/avatar/${md5(email)}` } className="App-logo" alt="logo" />
        </div>
        <div className="player">
          <p data-testid="header-player">
            { nome }
          </p>
        </div>
        <div className="Score">
          <p data-testid="header-score">
            Pontuação:
            {' '}
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
};

const mapStateToProps = (state) => ({
  nome: state.player.name,
  email: state.player.email,
});

export default connect(mapStateToProps)(Header);
