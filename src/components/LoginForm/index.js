import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { setStorage, getStorage } from '../../services';
import getApi from '../../services/api';
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
    this.handleClick = this.handleClick.bind(this);
    this.requestToken = this.requestToken.bind(this);
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

  async requestToken() {
    const tokenUrl = 'https://opentdb.com/api_token.php?command=request';
    const apiTokenResult = await getApi(tokenUrl);
    const { token } = apiTokenResult;
    return token;
  }

  async handleClick() {
    const { email, playerName } = this.state;

    const token = await this.requestToken();

    const gravatarHash = md5(email);

    const state = {
      player: {
        name: playerName,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
        gravatarURL: `https://www.gravatar.com/avatar/${gravatarHash}`,
      },
    };

    const ranking = {
      name: playerName,
      score: 0,
      picture: `https://www.gravatar.com/avatar/${gravatarHash}`,
    };

    const oldRanking = getStorage('ranking');
    const newRanking = [...oldRanking];
    newRanking.push(ranking);

    setStorage('state', state);
    setStorage('token', token);
    setStorage('ranking', newRanking);
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
                onKeyPress={ this.handleClick }
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
