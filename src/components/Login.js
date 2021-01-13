import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { login } from '../actions';
import * as callAPI from '../services/callAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      redirect: false,
    };
    this.isDisabled = this.isDisabled.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    const { login } = this.props;
    const { name, email } = this.state;
    event.preventDefault();
    const callingApi = await callAPI.requestToken();
    const { token } = callingApi;
    localStorage.setItem('token', JSON.stringify(token));
    const hash = md5(email).toString();
    const imageSrc = `https://www.gravatar.com/avatar/${hash}`
    const playerInfo = { name, email, token, imageSrc };
    login(playerInfo);
    this.setState({ redirect: true });
    return callingApi;
  }

  isDisabled() {
    const { name, email } = this.state;
    if (name !== '' && email !== '') {
      return false;
    }
    return true;
  }

  render() {
    const { redirect } = this.state;
    if (redirect) return (<Redirect to="/game" />);
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            name="Name"
            required="required"
            placeholder="Nome"
            data-testid="input-player-name"
            onChange={ (e) => this.setState({ name: e.target.value }) }
          />
          <input
            type="email"
            name="Email"
            required="required"
            placeholder="E-mail"
            data-testid="input-gravatar-email"
            onChange={ (e) => this.setState({ email: e.target.value }) }
          />
          <button type="submit" data-testid="btn-play" disabled={ this.isDisabled() }>
            Jogar
          </button>
        </form>
        <Link to="/settings">
          <button type="button" data-testid="btn-settings">
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (object) => dispatch(login(object)) });

export default connect(null, mapDispatchToProps)(Login);
