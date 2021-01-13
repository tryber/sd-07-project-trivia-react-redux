import React, { Component } from 'react';
import { LoginForm, ConfigButton } from '../../components';
import './style.css';

class Login extends Component {
  render() {
    return (
      <div>
        <LoginForm />
        <ConfigButton />
      </div>
    );
  }
}

export default Login;
