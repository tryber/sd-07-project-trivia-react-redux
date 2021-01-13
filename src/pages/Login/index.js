import React, { Component } from 'react';
import { Header, Question, RankingItem } from '../../components';
import './style.css';

class Login extends Component {
  render() {
    return (
      <div>
        <Header />
        <Question />
        <RankingItem />
      </div>
    );
  }
}

export default Login;
