import React, { Component } from 'react';
import { ResultToken } from '../services/Api';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    ResultToken();
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
        <Link to="/jogo">
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
          disabled={ !bothValid }
        >
          Jogar
        </button>
        </Link>
      </form>
    );
  }
}

export default Login;
