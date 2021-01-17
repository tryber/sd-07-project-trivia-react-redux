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
    const ranking = [{
      name,
      score: updateScore,
      picture: this.convertEmail(email),
    }];
    localStorage.setItem('ranking', JSON.stringify(ranking));
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
          <p data-testid="header-player-name">
            Usuário:
            <span>{ name }</span>
          </p>
          <p data-testid="header-score">
            Placar:
            <span>{ updateScore || score }</span>
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
