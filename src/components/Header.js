import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();
    this.convertEmail = this.convertEmail.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  componentDidUpdate() {
    this.saveUser();
  }

  // função que retorna o endereço da imagem do player lá do GRAVATAR
  convertEmail(email) {
    const user = md5(email);
    const hash = `https://www.gravatar.com/avatar/${user}`;
    return hash;
  }

  saveUser() {
    const { name, email, updateScore } = this.props;
    const getLocalStorage = JSON.parse(localStorage.getItem('ranking'));
    const setLocalStorage = [];
    const ranking = {
      name,
      score: updateScore || 0,
      picture: this.convertEmail(email),
    };
    if (getLocalStorage) {
      getLocalStorage.push(ranking);
      localStorage.removeItem('ranking');
      localStorage.setItem('ranking', JSON.stringify(getLocalStorage));
    } else {
      setLocalStorage.push(ranking);
      localStorage.setItem('ranking', JSON.stringify(setLocalStorage));
    }
  }

  render() {
    const { name, email, score, updateScore } = this.props;

    return (
      <div>
        <header>
          <img
            src={ this.convertEmail(email) }
            alt="userimage"
            data-testid="header-profile-picture"
          />
          <p>
            Usuário:
            <span data-testid="header-player-name">{ name }</span>
          </p>
          <p>
            Placar:
            <span data-testid="header-score">{ updateScore || score }</span>
          </p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.signIn.name,
  email: state.signIn.email,
  score: state.signIn.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  updateScore: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
