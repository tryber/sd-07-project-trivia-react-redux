import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import crypto from 'crypto-js';
import { thunkApiToken, addPlayer } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      buttonDisable: true,
    };
    this.enableButton = this.enableButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.verificationEmail = this.verificationEmail.bind(this);
    this.routeChangeSettings = this.routeChangeSettings.bind(this);
    this.routeChangeGame = this.routeChangeGame.bind(this);
  }

  verificationEmail() {
    const { email } = this.state;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    return regex.test(email);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.enableButton();
    });
  }

  routeChangeSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

  async routeChangeGame() {
    const { history, addToken, addNewPlayer } = this.props;
    const { name, email } = this.state;
    const emailMd5 = crypto.MD5(email).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${emailMd5}`;
    const player = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: gravatarUrl,
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
    addNewPlayer(player);
    await addToken();
    history.push('/game');
  }

  enableButton() {
    const { name } = this.state;
    if (name.length !== 0 && this.verificationEmail()) {
      return this.setState({ buttonDisable: false });
    }
    this.setState({ buttonDisable: true });
  }

  render() {
    const { buttonDisable, name, email } = this.state;
    return (
      <div>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.routeChangeSettings }
        >
          Configurações
        </button>
        <input
          type="text"
          name="name"
          value={ name }
          placeholder="insira seu nome"
          data-testid="input-player-name"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="email"
          value={ email }
          placeholder="insira seu email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          name="buttonDisable"
          disabled={ buttonDisable }
          onClick={ this.routeChangeGame }
        >
          Jogar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addNewPlayer: (player) => dispatch(addPlayer(player)),
  addToken: () => dispatch(thunkApiToken()),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  addToken: PropTypes.func.isRequired,
  addNewPlayer: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
