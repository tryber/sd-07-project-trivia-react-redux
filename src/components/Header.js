import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
// https://github.com/brix/crypto-js
// md5 gera as hash para add no fim do link de acordo com o email do user.
import { connect } from 'react-redux';

class Header extends Component {
  render() {
<<<<<<< HEAD
    const { email, nome } = this.props;
=======
    const { nome, email } = this.props;
>>>>>>> e02782419880e1fafacc595305f1388c58dbdadc
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${md5(email)}` } className="App-logo" alt="logo" width="50" height="50" />
        <p data-testid="header-player">{ nome }</p>
        <p data-testid="header-score">Score: 0</p>
      </header>
    );
  }
}

<<<<<<< HEAD
const mapStateToProps = (state) => ({
  email: state.player.email,
  nome: state.player.name,
});

export default connect(mapStateToProps)(Header);
// https://react-redux.js.org/using-react-redux/connect-mapstate
=======
Header.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  nome: state.player.name,
  email: state.player.email,
});

export default connect(mapStateToProps)(Header);
>>>>>>> e02782419880e1fafacc595305f1388c58dbdadc
