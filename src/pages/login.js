import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, userEmail, getToken } from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      auth: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.click = this.click.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
    this.emailValidation();
  }

  emailValidation() {
    const { email, name, auth } = this.state;
    console.log(auth);
    const magicNumber = 0;
    if (email.match(/\S+@\S+\.\S+/) && name.length > magicNumber) {
      return this.setState({ auth: true });
    }
  }

  async click() {
    const { nameDispatch, emailDispatch, token } = this.props;
    const { name, email } = this.state;
    nameDispatch(name);
    emailDispatch(email);
    token();
  }

  render() {
    const { name, email, auth } = this.state;
    return (
      <div>
        <label htmlFor="input-name">
          Nome:
          <input
            id="input-name"
            placeholder="Seu nome"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
        <label htmlFor="input-email">
          Email:
          <input
            id="input-email"
            placeholder="seu@email.com"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          onClick={ this.click }
          disabled={ !auth }
        >
          Jogar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  nameDispatch: (name) => dispatch(login(name)),
  emailDispatch: (email) => dispatch(userEmail(email)),
  token: () => dispatch(getToken()),
});

Login.propTypes = {
  nameDispatch: PropTypes.func.isRequired,
  emailDispatch: PropTypes.func.isRequired,
  token: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
