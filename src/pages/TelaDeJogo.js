import React, { Component } from 'react';
import { connect } from 'react-redux';

class TelaDeJogo extends Component {
  render() {
    const { email } = this.props;

    return (
      <div>
        <header>
          <h1>Tela de Jogo</h1>
          <img data-testid="header-profile-picture" alt="" />
          <div data-testid="header-player-name">
          </div>
          <div data-testid="header-score">
          </div>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return ({
    email: state.gravatarEmail,
  });
}

export default connect(mapStateToProps)(TelaDeJogo);
