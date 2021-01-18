import React, { Component } from 'react';
import { LoginForm, ConfigButton } from '../../components';
import './style.css';
import angus from './angus.pgn';

class Login extends Component {
  render() {
    return (
      <div className="loginPage-container">
        <div style={ { visibility: 'hidden' } }>a</div>
        <img src={ angus } alt="angus young" />
        <LoginForm />
        <ConfigButton />
      </div>
    );
  }
}

export default Login;
