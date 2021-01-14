import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import crypto from 'crypto-js';
import { thunkApiToken, setName, addGravatar } from '../actions';

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
    this.routeChangeConfig = this.routeChangeConfig.bind(this);
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

  routeChangeConfig() {
    const { history } = this.props;
    history.push('/configuracoes');
  }

  routeChangeGame() {
    const { history, sendName, addToken, setGravatar } = this.props;
    const { name, email } = this.state;
    const emailMd5 = crypto.MD5(email).toString();
    setGravatar(emailMd5);
    addToken();
    sendName(name);
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
          onClick={ this.routeChangeConfig }
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
  addToken: () => dispatch(thunkApiToken()),
  sendName: (name) => dispatch(setName(name)),
  setGravatar: (gravatar) => dispatch(addGravatar(gravatar)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  sendName: PropTypes.func.isRequired,
  addToken: PropTypes.func.isRequired,
  setGravatar: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
