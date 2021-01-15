import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CryptoJs from 'crypto-js';
import { connect } from 'react-redux';
import { login, fetchToken, hashAction } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.saveToken = this.saveToken.bind(this);
    this.settingsButton = this.settingsButton.bind(this);
    this.getHash = this.getHash.bind(this);
    this.state = {
      email: '',
      name: '',
    };
  }

  componentDidMount() {
    const { fetchTokenAction } = this.props;
    fetchTokenAction();
    this.getHash();
  }

  settingsButton() {
    const { history } = this.props;
    history.push('/settings');
  }

  getHash() {
    const { email } = this.state;
    const { getHashAction } = this.props;
    const hash = CryptoJs.MD5(email).toString().trim().toLowerCase();
    getHashAction(hash);
  }

  async saveToken() {
    const { name, email } = this.state;
    const { userLogin, history, token } = this.props;
    console.log(token);
    userLogin(email, name);
    localStorage.setItem('token', JSON.stringify(token));
    history.push('/game');
  }

  render() {
    const { email, name } = this.state;
    return (
      <div>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.settingsButton }
        >
          Settings
        </button>
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
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !email || !name }
          onClick={ this.saveToken }
        >
          Jogar
        </button>
      </div>
    );
  }
}
Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  fetchTokenAction: PropTypes.func.isRequired,
  getHashAction: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchTokenAction: () => dispatch(fetchToken()),
  userLogin: (email, name) => dispatch(login(email, name)),
  getHashAction: (hash) => dispatch(hashAction(hash)),
});

export default connect(null, mapDispatchToProps)(Login);
