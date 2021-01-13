import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.fetchApi = this.fetchApi.bind(this);
    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async fetchApi() {
    const { history } = this.props;
    const { name, email } = this.state;
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const requestJson = await request.json();
    const tokenCode = requestJson.token;
    localStorage.setItem('token', tokenCode);
    localStorage.setItem('state', JSON.stringify(
      { player: { name, assertions: 0, score: 0, gravatarEmail: email } },
    ));
    history.push('/game');
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <input
          type="text"
          data-testid="input-player-name"
          name="name"
          placeholder="Nome"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          type="email"
          data-testid="input-gravatar-email"
          name="email"
          placeholder="Email"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ !email.length || !name.length }
          onClick={ this.fetchApi }
        >
          Jogar
        </button>
        <Link to="/settings" data-testid="btn-settings">Settings</Link>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
