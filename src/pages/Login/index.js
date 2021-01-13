import React, { Component } from 'react';
import { Answer, Header, LoginForm, Next, Question, RankingItem, Timer } from '../../components';
import './style.css';

class Login extends Component {
  render() {
    return (
      <div>
        <Header />
        <Timer />
        <Question />
        <RankingItem />
        <Next />
      </div>
    );
  }
}

export default Login;
