import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();

    this.convertEmail = this.convertEmail.bind(this);
  }

  // função que retorna o endereço da imagem do player lá do GRAVATAR
  convertEmail(email) {
    console.log(email);
    const user = md5(email);
    const hash = `https://www.gravatar.com/avatar/${user}`;
    return hash;
  }

  render() {
    const { name, email, score } = this.props;
    return (
      <div>
        <header>
          <img
            src={ this.convertEmail(email) }
            alt="userimage"
            data-testid="header-profile-picture"
          />
          <p
            data-testid="header-player-name"
          >
            Usuário:
            <span>{name}</span>
          </p>
          <p
            data-testid="header-score"
          >
            Placar:
            <span>{score}</span>
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
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
