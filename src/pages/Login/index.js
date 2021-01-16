import React, { Component } from 'react';
import { LoginForm, ConfigButton } from '../../components';
import './style.css';

class Login extends Component {
  render() {
    return (
      <div className="loginPage-container">
        <div style={ { visibility: 'hidden' } }>a</div>
        <LoginForm />
        <ConfigButton />
      </div>
    );
  }
}

export default Login;
