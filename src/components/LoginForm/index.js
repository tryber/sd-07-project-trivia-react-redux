import React, { Component } from 'react';
import './style.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      playerName: '',
      isDisabled: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange({ name, value }) {
    this.setState(
      { [name]: value },
      () => {
        const { email, playerName } = this.state;
        const emailvalidation = /[\w\d]+@+[\w\d]+.com/;
        const nameCheck = '';
        if (emailvalidation.test(email) && playerName !== nameCheck) {
          this.setState({ isDisabled: false });
        } else {
          this.setState({ isDisabled: true });
        }
      },
    );
  }

  render() {
    const { email, playerName, isDisabled } = this.state;
    return (
      <section>
        <form onSubmit={ (e) => this.handleSubmit(e) }>
          <div className="field">
            <label htmlFor="email-input">
              <input
                id="email-input"
                name="email"
                value={ email }
                onChange={ ({ target }) => this.handleInputChange(target) }
                data-testid="input-gravatar-email"
                type="email"
                placeholder="Informe seu e-mail"
                autoComplete="off"
                autoCorrect="off"
                required
              />
            </label>
          </div>
          <div className="field">
            <label htmlFor="input-player-name">
              <input
                id="input-player-name"
                name="playerName"
                value={ playerName }
                onChange={ ({ target }) => this.handleInputChange(target) }
                data-testid="input-player-name"
                placeholder="Informe seu nome"
                type="text"
                required
              />
            </label>
          </div>
          <div className="field">
            <button
              type="submit"
              disabled={ isDisabled }
              data-testid="btn-play"
            >
              Jogar
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default LoginForm;
