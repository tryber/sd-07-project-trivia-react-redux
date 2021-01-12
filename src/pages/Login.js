import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchToken, requestSucessToken } from '../actions';
import apiToken from '../services/api';

class Login extends Component {
  constructor(props) {
    super(props);

    this.saveToken = this.saveToken.bind(this);
    this.tokenObject = this.tokenObject.bind(this);
    this.saveToken = this.saveToken.bind(this);

    this.state = {
      email: '',
      name: '',
      token: '',
    };
  }

  tokenObject(tokens) {
    this.setState({
      token: tokens,
    });
  }

  async saveToken() {
    const tokenResponse = await apiToken();
    this.tokenObject(tokenResponse);
    const { token } = this.state;
    const { addToken } = this.props;
    localStorage.setItem('token', JSON.stringify(token));
    addToken(token);
  }

  render() {
    const { email, name } = this.state;

    return (
      <div>
        <form>
          <input
            value={ name }
            name="name"
            type="text"
            data-testid="input-player-name"
            placeholder="Digite seu nome"
            onChange={ (e) => this.setState({ name: e.target.value }) }
          />
          <input
            value={ email }
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            placeholder="Digite seu e-mail"
            onChange={ (e) => this.setState({ email: e.target.value }) }
          />
        </form>
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !email || !name }
            onClick={ this.saveToken }
          >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  addToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendToken: (token) => dispatch(fetchToken(token)),
  addToken: (token) => dispatch(requestSucessToken(token)),
});

export default connect(null, mapDispatchToProps)(Login);
