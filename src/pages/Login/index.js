import React, { Component } from 'react';
import { LoginForm, ConfigButton } from '../../components';
import './style.css';
import angus from '../../images/angus.png';
import longway from '../../images/longway.png';

class Login extends Component {
  render() {
    return (
      <div className="loginPage-container">
        <div style={ { visibility: 'hidden' } }>a</div>
        <div className="img-master">
          <img src={ longway } className="App-circle" alt="its a long way to the top" />
          <img src={ angus } className="App-logo" alt="angus young" />
        </div>
        <LoginForm />
        <ConfigButton />
      </div>
    );
  }
}

export default Login;
