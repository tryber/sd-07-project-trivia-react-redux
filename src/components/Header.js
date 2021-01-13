import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

// https://github.com/brix/crypto-js
// md5 gera as hash para add no fim do link de acordo com o email do user.

export default class Header extends Component {
  render() {
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${md5('email')}` } className="App-logo" alt="logo" width="50" height="50" />
        <p data-testid="header-player">Nome</p>
        <p data-testid="header-score">Score</p>
      </header>
    );
  }
}
