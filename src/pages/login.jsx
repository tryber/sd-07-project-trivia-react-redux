import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import isLoginOk from '../helpers/isLoginOk';
import { loginAction } from '../action';
import logo from '../trivia.png';

// import { Container } from './styles';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userName: '',
      login: false,
      setting: false,
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
    this.setting = this.setting.bind(this);
  }

  onChangeHandler(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  setting() {
    this.setState(
      {
        setting: true,
      },
    );
  }

  redirectTo(email) {
    const { userLoggin } = this.props;
    this.setState({
      login: true,
    });
    userLoggin(email);
  }

  render() {
    const { email, userName, login, setting } = this.state;
    const gravatar = md5(email);
    console.log(`gravatar: ${gravatar}`);
    if (login) return <Redirect to="/playgame" />;
    if (setting) return <Redirect to="/settings" />;
    return (
      <header>
        <div className="imputs">
          <img src={ logo } className="App-logo" alt="logo" />
          <div>
            <input
              onChange={ this.onChangeHandler }
              type="text"
              name="email"
              placeholder="Email"
              data-testid="input-gravatar-email"
            />
          </div>
          <div>
            <input
              onChange={ this.onChangeHandler }
              type="text"
              name="userName"
              data-testid="input-player-name"
              placeholder="Nome"
            />
          </div>
          <div>
            <button
              disabled={ isLoginOk(email, userName) }
              type="submit"
              data-testid="btn-play"
              onClick={ () => this.redirectTo(email) }
            >
              Jogar
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="btn-settings"
              data-testid="btn-settings"
              onClick={ () => this.setting() }
            >
              Configurações
            </button>
          </div>
        </div>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLoggin: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  userLoggin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
