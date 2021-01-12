import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class TelaDeJogo extends Component {
  render() {
    const { email, name, score } = this.props;
    const hash = md5(email);

    return (
      <div>
        <header>
          <h1>Tela de Jogo</h1>
          <img
            data-testid="header-profile-picture"
            alt=""
            src={ `https://www.gravatar.com/avatar/${hash}` }
          />
          <div data-testid="header-player-name">
            <p>{name}</p>
          </div>
          <div data-testid="header-score">
            <p>{score}</p>
          </div>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return ({
    email: state.gravatarEmail,
    name: state.name,
    score: state.score,
  });
}

TelaDeJogo.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(TelaDeJogo);
