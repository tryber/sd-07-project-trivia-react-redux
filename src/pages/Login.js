import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAction, questionsThunk } from '../actions';
import tokenAPI from '../services/tokenAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      username: '',
      disabled: true,
    };

    this.verifyLogin = this.verifyLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  verifyLogin({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, username } = this.state;
      if (email.length > 0 && username.length > 0) {
        return this.setState({ disabled: false });
      }
      return this.setState({ disabled: true });
    });
  }

  async handleClick() {
    const { email, username } = this.state;
    const { login, questions } = this.props;
    const token = await tokenAPI();
    localStorage.setItem('token', token);
    login(email, username);
    questions();
  }

  render() {
    const { email, username, disabled } = this.state;
    return (
      <div>
        <br />
        <div>
          <Link
            to="/settings"
          >
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
          <br />
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.verifyLogin }
            required
          />
          <br />
          <input
            name="username"
            id="username"
            type="username"
            data-testid="input-player-name"
            placeholder="Jogador"
            value={ username }
            onChange={ this.verifyLogin }
            required
          />
          <br />
          <Link
            to="/gamepage"
          >
            <button
              id="button"
              type="button"
              disabled={ disabled }
              data-testid="btn-play"
              onClick={ () => this.handleClick() }
            >
              JOGAR!
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  questions: () => dispatch(questionsThunk()),
  login: (email, username) => dispatch(loginAction(email, username)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  login: PropTypes.func.isRequired,
  questions: PropTypes.func.isRequired,
};
