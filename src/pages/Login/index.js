import React, { Component } from 'react';
import { LoginForm, ConfigButton } from '../../components';
import './style.css';
import angus from '../../images/angus.png';

class Login extends Component {
  render() {
    return (
      <div className="loginPage-container">
        <div style={ { visibility: 'hidden' } }>a</div>
        <img src={ angus } className="App-logo" alt="angus young" />
        <LoginForm />
        <ConfigButton />
      </div>
    );
  }
}

export default Login;
