import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Trivia } from '../components';
import { fetchTokenTrivia } from '../actions/fetchTokenTrivia';
import signIn from '../actions/signIn';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.goToSettings = this.goToSettings.bind(this);
    this.state = {
      emailInput: '',
      nameInput: '',
      disabled: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.enableButton());
  }

  enableButton() {
    const { emailInput, nameInput } = this.state;
    if (nameInput && emailInput) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  async handleClick() {
    const { token, history, createPlayer } = this.props;
    const { nameInput, emailInput } = this.state;
    const score = 0;
    await token();
    history.push('./game');
    createPlayer(nameInput, emailInput, score);
    const newPlayer = {
      player: {
        name: nameInput,
        assertions: 0,
        score: 0,
        email: emailInput,
      },
    };
    const getLocalStorage = JSON.parse(localStorage.getItem('player'));
    if (getLocalStorage) {
      localStorage.removeItem('state');
      localStorage.setItem('state', JSON.stringify(newPlayer));
    }
    localStorage.setItem('state', JSON.stringify(newPlayer));
  }

  goToSettings() {
    const { history } = this.props;
    history.push('./settings');
  }

  render() {
    const { emailInput, nameInput, disabled } = this.state;

    return (
      <div className="login-header">
        <label htmlFor="nameInput">
          Name:
          <input
            id="nameInput"
            name="nameInput"
            className="login-input"
            type="text"
            value={ nameInput }
            data-testid="input-player-name"
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
        <label htmlFor="emailInput">
          E-mail:
          <input
            id="emailInput"
            name="emailInput"
            className="login-input"
            type="email"
            value={ emailInput }
            data-testid="input-gravatar-email"
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
        <button
          type="button"
          className="button-login"
          disabled={ disabled }
          data-testid="btn-play"
          onClick={ (event) => this.handleClick(event) }
        >
          Jogar
        </button>
        <button
          type="button"
          className="button-login"
          data-testid="btn-settings"
          onClick={ (event) => this.goToSettings(event) }
        >
          Configurações
        </button>
        <Trivia />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  token: (key) => dispatch(fetchTokenTrivia(key)),
  createPlayer: (name, email, score) => dispatch(signIn(name, email, score)),
});

Login.propTypes = {
  token: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  createPlayer: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
