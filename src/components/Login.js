import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { login, changeScore } from '../actions';
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
    this.sendPlayerInfo = this.sendPlayerInfo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputs = this.handleInputs.bind(this)
  }


 
  async handleSubmit(event) {
    event.preventDefault();
    const expiredToken = 3;
    const callingApi = await callAPI.requestToken();
    if (callingApi.response_code === expiredToken) return console.log('Email expirado');
    // incluir regra de negócio para token expirado
    const { token } = callingApi;
    localStorage.setItem('token', JSON.stringify(token));
    this.sendPlayerInfo(token);
    if(localStorage.getItem('playerScore')) {
      const { setScore } = this.props;
      setScore(JSON.parse(localStorage.getItem('playerScore')));
    }
    return callingApi;
  }

  sendPlayerInfo(token) {
    const { sendInfoToStore } = this.props;
    const { name, email } = this.state;
    const hash = md5(email).toString();
    const imageSrc = `https://www.gravatar.com/avatar/${hash}`;
    const playerInfo = { name, email, token, imageSrc };
    sendInfoToStore(playerInfo);
    return this.setState({ redirect: true });
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
            onChange={ (e) => { this.setState({ name: e.target.value }); this.handleInputs; } }
          />
          <input
            type="email"
            name="Email"
            required="required"
            placeholder="E-mail"
            data-testid="input-gravatar-email"
            onChange={ (e) => { 
              this.setState({ email: e.target.value }); this.handleInputs }}
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
  sendInfoToStore: (object) => dispatch(login(object)),
setScore: (score) => dispatch(changeScore(score)),
});

const mapStateToProps = (state) => ({
  score: state.player.score,
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  sendInfoToStore: propTypes.func,
}.isRequired;
