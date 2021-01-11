import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <input
          type="text"
          placeholder="name"
          data-testid="input-player-name"
          value={ name }
          onChange={ (event) => this.setState({ name: event.target.value }) }
        />
        <input
          type="email"
          placeholder="email"
          data-testid="input-gravatar-email"
          value={ email }
          onChange={ (event) => this.setState({ email: event.target.value }) }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !(name && email) }
        >
          Jogar
        </button>
      </div>
    );
  }
}
