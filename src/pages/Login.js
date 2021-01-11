import React, { Component } from 'react';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    }

    this.isValid = this.isValid.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  isValid() {
    const { name, email } = this.state;
    const emailValid = /\S+@\S+\.\S+/;
    if(name !== '' && emailValid.test(email)) {
      return false;
    }

    return true;
  }

  handleChange({ target }) {
    const { name, value }  = target;
    this.setState({ [name]: value });
  }

  render() {
    const { name, email } = this.state;
    return(
      <>
        <div className="App">
          <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
          </header>
        </div>

        <form>
          <input
            type="text"
            name="name"
            value={ name }
            placeholder="Nome"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />

          <input 
            type="email"
            name="email"
            value={ email }
            placeholder="E-mail"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />

          <button
            type="submit"
            disabled={ this.isValid() }
            data-testid="btn-play"
          >
            Jogar
          </button>
        </form>
      </>
    );
  }
}

export default Login;
