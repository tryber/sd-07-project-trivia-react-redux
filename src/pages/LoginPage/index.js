import React, { Component } from 'react';
import ButtonSetting from '../../components/ButtonSetting';
import LoginForm from '../../components/LoginForm';

class LoginPage extends Component {
  render() {
    return (
      <>
        <LoginForm />
        <ButtonSetting />
      </>
    );
  }
}

export default LoginPage;
