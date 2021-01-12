import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.validateDatabase = this.validateDatabase.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // validateDatabase(username, email) {
  //   const expectedPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   const requiredEmail = expectedPattern.test(email) && email !== '';
  //   const requiredName = username !== '';
  //   console.log(requiredEmail && requiredName)
  //   return requiredEmail && requiredName;
  // }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    // this.validateDatabase(name, value);
  }

  handleClick() {
    console.log('clicou');
  }

  render() {
    const { username, email } = this.state;
    const expectedPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const requiredEmail = expectedPattern.test(email) && email !== '';
    const requiredName = username !== '';
    const bothValid = requiredEmail && requiredName;
    console.log('name', requiredName);
    console.log('email', requiredEmail);
    console.log(this.state);
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
      </form>
    );
  }
}

export default Login;
