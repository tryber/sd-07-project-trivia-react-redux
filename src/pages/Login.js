import React, { Component } from 'react';
import FormLogin from '../components/FormLogin';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateImputs = this.validateImputs.bind(this);
  }

  validateImputs() {
    const { email, name } = this.state;
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValidator.test(email) && name.length) {
      return false;
    }
    return true;
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    return (
      <FormLogin
        handleChange={ this.handleChange }
        validateImputs={ this.validateImputs }
      />
    );
  }
}

export default Login;
