import React, { Component } from 'react';
import { LoginForm, Question } from '../../components';
import './style.css';

class Login extends Component {
  render() {
    return (
      <div>
        <LoginForm />
        <Question />
      </div>
    );
  }
}

export default Login;
