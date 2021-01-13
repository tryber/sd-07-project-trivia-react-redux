import React, { Component } from 'react';
import { Header, Question, LoginForm, RankingItem } from '../../components';
import './style.css';

class Login extends Component {
  render() {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
}

export default Login;
