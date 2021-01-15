import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

import { getTokenAction } from '../../actions/tokenAction';
import { playerAction } from '../../actions/playerAction';

import Logo from '../../trivia.png';

import './styles.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      email: '',
      name: '',
    };
    this.changeInputs = this.changeInputs.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.setSettings = this.setSettings.bind(this);
  }

  setSettings() {
    const { history } = this.props;
    if (history) history.push('/settings');
  }

  async setDisabled() {
    const { email, name } = this.state;
    if (email !== '' && name !== '') {
      await this.setState({ disabled: false });
    } else {
      await this.setState({ disabled: true });
    }
  }

  async changeInputs({ target }) {
    const { name, value } = target;
    await this.setState({ [name]: value });
    await this.setDisabled();
  }

  handleLogin(event) {
    event.preventDefault();
    const { tokenAction, history, logarPlayer } = this.props;
    tokenAction();
    const { email, name } = this.state;
    const gravatar = md5(email).toString();
    const player = {
      name,
      score: 0,
      assertions: 0,
      gravatarEmail: `https://www.gravatar.com/avatar/${gravatar}`,
    };
    logarPlayer(player);
    localStorage.setItem('state', JSON.stringify({ player }));
    if (history) history.push('/game');
  }

  render() {
    const { disabled, email, name } = this.state;
    const { isFetchingToken, error } = this.props;
    return (
      <div className="login-container">
        <form>
          {isFetchingToken && <div>loading</div>}
          {error && <div>error</div>}
          <img
            src={ Logo }
            alt="logo"
          />
          <label htmlFor="email">
            Email do Gravatar:
            <input
              name="email"
              id="email"
              type="email"
              data-testid="input-gravatar-email"
              onChange={ this.changeInputs }
              value={ email }
            />
          </label>

          <label htmlFor="name">
            Nome do Jogador:
            <input
              data-testid="input-player-name"
              name="name"
              id="name"
              type="text"
              onChange={ this.changeInputs }
              value={ name }
            />
          </label>

          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabled }
            onClick={ this.handleLogin }
            className="btn-play"
          >
            Jogar
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.setSettings }
            className="btn-settings"
          >
            settings
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  isFetchingToken: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  tokenAction: PropTypes.func.isRequired,
  logarPlayer: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = ({ token }) => ({
  isFetchingToken: token.isFetchingToken,
  error: token.error,
});

const mapDispatchToProps = (dispatch) => ({
  tokenAction: () => dispatch(getTokenAction()),
  logarPlayer: (player) => dispatch(playerAction(player)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
