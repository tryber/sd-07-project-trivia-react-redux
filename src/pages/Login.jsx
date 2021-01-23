import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import GetIcon from '../components/Icons';
import '../styles/Login.css';
import { getToken } from '../services/API';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      isDisabled: true,
      isRedirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
    this.handleAPIRequest = this.handleAPIRequest.bind(this);
  }

  validate() {
    const { email, name } = this.state;
    if (email.length && name.length) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.validate());
  }

  saveLocalStorage({ token }) {
    const { name, email } = this.state;
    const objectPlayer = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('token', token);
    localStorage.setItem('state', JSON.stringify(objectPlayer));
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (!ranking) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }

    this.setState({
      isRedirect: true,
    });
  }

  async handleAPIRequest() {
    const response = await getToken();
    this.saveLocalStorage(response);
  }

  render() {
    const { handleChange } = this;
    const { name, email, isDisabled, isRedirect } = this.state;
    if (isRedirect) {
      return <Redirect to="/game" />;
    }
    return (
      <div className="login-container">
        <div className="login-content">
          <div className="settings-icon-content">
            <Link to="/settings">
              <button
                type="button"
                className="btn-settings"
                data-testid="btn-settings"
              >
                <GetIcon name="gearFillIcon" className="icon-settings" />
              </button>
            </Link>
          </div>
          <form className="login-input-field">
            <img src="/images/logo.png" alt="Triva logo" />
            <label htmlFor="input-player-name">
              <input
                className="login-inputs"
                id="input-player-name"
                placeholder="Name"
                name="name"
                value={ name }
                data-testid="input-player-name"
                onChange={ (event) => handleChange(event) }
              />
            </label>

            <label htmlFor="input-gravatar-email">
              <input
                className="login-inputs"
                id="input-gravatar-email"
                placeholder="email@email.com"
                name="email"
                value={ email }
                data-testid="input-gravatar-email"
                onChange={ (event) => handleChange(event) }
              />
            </label>
            <button
              type="button"
              className="btn-play"
              disabled={ isDisabled }
              data-testid="btn-play"
              onClick={ () => this.handleAPIRequest() }
            >
              Jogar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
