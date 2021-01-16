import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, fetchToken } from '../actions/index';
import { setStorage } from '../services';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      authentication: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.saveLoginLocalStorage = this.saveLoginLocalStorage.bind(this);
  }

  saveLoginLocalStorage(name, email) {
    const newPlayer = {
      player: {
        name,
        email,
        score: 0,
        assertions: 0,
      },
    };
    setStorage('state', newPlayer);
  }

  handleEmailChange({ target }) {
    const { value } = target;
    this.setState({ email: value }, () => {
      const { email } = this.state;
      const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      const verifyEmail = email.match(regexEmail);
      if (verifyEmail) {
        this.setState({ authentication: true });
      } else {
        this.setState({ authentication: false });
      }
    });
  }

  handleNameChange({ target }) {
    const { value } = target;
    this.setState({ name: value });
  }

  async handleClick() {
    const { history, tokenAction, token } = this.props;
    await tokenAction();
    localStorage.setItem('token', token);
    history.push('/game');
  }

  render() {
    const { authentication, email, name } = this.state;
    const { loginAction } = this.props;
    const numberCharacters = 1;
    const { history } = this.props;

    return (
      <div>
        <input
          data-testid="input-gravatar-email"
          onChange={ (event) => this.handleEmailChange(event) }
        />
        <input
          data-testid="input-player-name"
          onChange={ (event) => this.handleNameChange(event) }
        />
        <button
          data-testid="btn-play"
          disabled={ !authentication || name.length < numberCharacters }
          type="button"
          onClick={ () => {
            loginAction(name, email);
            this.handleClick();
            this.saveLoginLocalStorage(name, email);
          } }
        >
          Jogar
        </button>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginAction: (name, email) => dispatch(login(name, email)),
  tokenAction: (token) => dispatch(fetchToken(token)),
});

const mapStateToProps = (state) => ({
  token: state.login.token,
});

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  tokenAction: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
