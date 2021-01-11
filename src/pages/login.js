import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, userEmail, apiToken } from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      auth: false,
      token: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.click = this.click.bind(this);
    this.fetchApi = this.fetchApi.bind(this);
  }

  fetchApi() {
    const url = 'https://opentdb.com/api_token.php?command=request';
    const { saveToken } = this.props;
    const { token } = this.state;
    fetch(url)
      .then((response) => response.json())
      .then((json) => this.setState({ token: json.token }))
      .then(saveToken(token));
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
    const { nameDispatch, emailDispatch, saveToken } = this.props;
    const { name, email, token } = this.state;
    nameDispatch(name);
    emailDispatch(email);
    this.fetchApi();
  }

  render() {
    const { name, email, auth } = this.state;
    return (
      <div>
        <input
          placeholder="Name"
          name="name"
          value={ name }
          data-testid="input-player-name"
          onChange={ (event) => this.handleChange(event) }
        />
        <input
          placeholder="Email"
          name="email"
          value={ email }
          data-testid="input-gravatar-email"
          onChange={ (event) => this.handleChange(event) }
        />
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
  saveToken: (token) => dispatch(apiToken(token)),
});

Login.propTypes = {
  nameDispatch: PropTypes.func.isRequired,
  emailDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
