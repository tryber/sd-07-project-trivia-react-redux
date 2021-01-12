import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      gravatarEmail: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  isValid(name, gravatarEmail) {
    return name && gravatarEmail;
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { name, gravatarEmail } = this.state;
    return (
      <form>
        <input
          name="name"
          value={ name }
          type="text"
          data-testid="input-player-name"
          placeholder="Name"
          onChange={ this.handleChange }
        />
        <input
          name="gravatarEmail"
          value={ gravatarEmail }
          type="text"
          data-testid="input-gravatar-email"
          placeholder="Email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !this.isValid(name, gravatarEmail) }
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
