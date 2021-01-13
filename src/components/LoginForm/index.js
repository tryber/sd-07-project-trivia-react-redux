import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getStorage, setStorage } from '../../services';
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
    // this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    const token = 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6';
    setStorage('token', token);
    console.log(getStorage('token'));
  }

  render() {
    const { email, playerName, isDisabled } = this.state;
    return (
      <section className="login-section">
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
            <Link to="/game">
              <button
                type="submit"
                disabled={ isDisabled }
                data-testid="btn-play"
                onClick={ this.handleClick }
              >
                Jogar
              </button>
            </Link>
          </div>
        </form>
      </section>
    );
  }
}

export default LoginForm;
