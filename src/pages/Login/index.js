import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isDisable: true,
      name: '',
      email: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange({ name: inputName, value }) {
    this.setState(
      { [inputName]: value },
      () => {
        const { name, email } = this.state;
        if (name !== '' && email !== '') {
          this.setState({ isDisable: false });
        } else {
          this.setState({ isDisable: true });
        }
      },
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    // Validações
  }

  render() {
    const { isDisable, name, email } = this.state;
    return (
      <main onSubmit={ (e) => this.handleSubmit(e) }>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              data-testid="input-player-name"
              value={ name }
              onChange={ ({ target }) => this.handleInputChange(target) }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              name="email"
              type="email"
              data-testid="input-gravatar-email"
              autoComplete="off"
              autoCorrect="off"
              value={ email }
              onChange={ ({ target }) => this.handleInputChange(target) }
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ isDisable }
          >
            Jogar
          </button>
        </form>
      </main>
    );
  }
}

export default Login;
