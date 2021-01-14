import React, { Component } from 'react';
import PropTypes from 'prop-types';
import resultToken from '../services/Api';
import generateHash from '../utils';
import questionsRequest from '../services/QuestionsRequest';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickSettingsBtn = this.handleClickSettingsBtn.bind(this);
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { username, email } = this.state;
    resultToken();
    generateHash(username, email);
    const { history } = this.props;
    history.push('/jogo');
  }

  handleClickSettingsBtn() {
    const { history } = this.props;
    history.push('/config');
  }

  render() {
    const { username, email } = this.state;
    const expectedPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const requiredEmail = expectedPattern.test(email) && email !== '';
    const requiredName = username !== '';
    const bothValid = requiredEmail && requiredName;

    return (
      <form>
        <label htmlFor="name-input">
          <input
            name="username"
            placeholder="Seu nome"
            data-testid="input-player-name"
            onChange={ this.handleInputChange }
          />
        </label>
        <label htmlFor="email-input">
          <input
            name="email"
            placeholder="Seu email"
            data-testid="input-gravatar-email"
            onChange={ this.handleInputChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
          disabled={ !bothValid }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleClickSettingsBtn }
        >
          Configuração
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
