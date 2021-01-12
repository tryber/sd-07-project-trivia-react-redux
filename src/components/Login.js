import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };
    this.isDisabled = this.isDisabled.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = 'https://opentdb.com/api_token.php?command=request';
    try {
      fetch(url)
        .then((results) => results.json())
        .then((response) => {
          localStorage.setItem('token', response.token);
          return ({ token: response.token, date: new Date() });
        });
    } catch (err) {
      localStorage.clear();
    }


  isDisabled() {
    const { name, email } = this.state;
    if (name !== '' && email !== '') {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            name="Name"
            required="required"
            placeholder="Nome"
            data-testid="input-player-name"
            onChange={ (e) => this.setState({ name: e.target.value }) }
          />
          <input
            type="email"
            name="Email"
            required="required"
            placeholder="E-mail"
            data-testid="input-gravatar-email"
            onChange={ (e) => this.setState({ email: e.target.value }) }
          />
          <button type="submit" data-testid="btn-play" disabled={ this.isDisabled() }>
            Jogar
          </button>
        </form>
        <Link to="/settings">
          <button type="button" data-testid="btn-settings">
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;
