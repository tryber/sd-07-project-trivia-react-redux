import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getEmail } from '../actions/user';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyEmailName = this.verifyEmailPass.bind(this);
  }

  handleSubmit() {
    const { sendEmail } = this.props;
    const { email } = this.state;
    sendEmail(email);
  }

  handleChange(e) {
    const { target } = e;
    const { value } = target;
    const inputName = target.name;
    this.setState({ [inputName]: value });
  }

  verifyEmailName() {
    const { email, name } = this.state;
    const re = /\S+@\S+\.\S+/;
    const minLength = 1;
    return re.test(email) && name.length >= minLength;
  }

  render() {
    const { email, name } = this.state;
    const { sendEmail } = this.props;
    return ( 
      <div>

        <h1> Trivia</h1>

        <label htmlFor="email">
          Nome
          <input
            placeholder="E-mail address"
            data-testid="email-input"
            type="email"
            value={ name }
            onChange={ this.handleChange }
            name="email"
          />
        </label>

        <label htmlFor="senha">
          Email
          <input
            placeholder="Password"
            data-testid="password-input"
            value={ email }
            onChange={ this.handleChange }
            name="password"
          />
        </label>

        <button
          type="submit"
          value=""
          disabled={ !this.verifyEmailName() }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>

      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(getEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
