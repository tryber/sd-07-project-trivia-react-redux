import React, { Component } from 'react';
import { Answer, LoginForm, Next, Question, Timer } from '../../components';
import './style.css';

class Login extends Component {
  render() {
    return (
      <div>
        <Question />
        <Answer />
        <Timer />
      </div>
    );
  }
}

export default Login;
