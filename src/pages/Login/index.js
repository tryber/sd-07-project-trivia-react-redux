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
        <div>
          <div className="outer-image">
            <img src={ longway } className="" alt="its a long way to the top" />
            <div className="inner-image">
              <img src={ angus } className="App-logo" alt="angus young" />
            </div>
          </div>
        </div>
        <LoginForm />
        <ConfigButton />
      </div>
    );
  }
}

export default Login;
