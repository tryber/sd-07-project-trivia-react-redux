import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
// https://github.com/brix/crypto-js
// md5 gera as hash para add no fim do link de acordo com o email do user.
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, nome } = this.props;
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${md5(email)}` } className="App-logo" alt="logo" width="50" height="50" />
        <p data-testid="header-player">{ nome }</p>
        <p data-testid="header-score">Score: 0</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.email,
  nome: state.player.name,
});

export default connect(mapStateToProps)(Header);
// https://react-redux.js.org/using-react-redux/connect-mapstate
