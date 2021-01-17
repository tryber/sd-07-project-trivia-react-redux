import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../Redux/actions';
import isLoginOk from '../helpers/isLoginOk';

import logo from '../trivia.png';
import gearIcon from '../gear.png';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      userName: '',
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickJogar = this.onClickJogar.bind(this);
  }

  onChangeHandler(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onClickJogar(email, username) {
    const { loginDispatch } = this.props;
    loginDispatch(email, username);
  }

  render() {
    const { email, userName } = this.state;
    const { logged } = this.props;

    if (logged) return <Redirect to="/playgame" />;

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
              value={ email }
            />
          </div>
          <div>
            <input
              onChange={ this.onChangeHandler }
              type="text"
              name="userName"
              data-testid="input-player-name"
              placeholder="Nome"
              value={ userName }
            />
          </div>
          <div>
            <button
              disabled={ isLoginOk(email, userName) }
              type="submit"
              data-testid="btn-play"
              onClick={ () => this.onClickJogar(email, userName) }
            >
              Jogar
            </button>
          </div>
          <div className="gear-settings" data-testid="btn-settings">
            <Link to="/settings"><img src={ gearIcon } alt="settings" /></Link>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  logged: state.userReducer.logged,
});

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (email, username) => dispatch(login(email, username)),
});

Login.propTypes = {
  loginDispatch: PropTypes.func.isRequired,
  logged: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
