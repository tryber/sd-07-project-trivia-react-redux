import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchToken, saveEmail, saveName } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      redirect: false,
    };
    this.handlerInput = this.handlerInput.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.tokenRequest = this.tokenRequest.bind(this);
  }

  handlerInput({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  validateEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/.test(email);
  }

  tokenRequest() {
    const { email, name } = this.state;
    const { namePlayer, emailPlayer, requestToken, history } = this.props;
    namePlayer(name);
    emailPlayer(email);
    requestToken();
    history.push('/trivia');
  }

  render() {
    const { email, name, redirect } = this.state;
    return redirect ? <Redirect to="/settings" /> : (
      <div>
        <form>
          <label htmlFor="email">
            Email:
            <input
              onChange={ this.handlerInput }
              data-testid="input-gravatar-email"
              name="email"
              id="email"
              type="email"
            />
          </label>
          <label htmlFor="nome">
            Nome:
            <input
              onChange={ this.handlerInput }
              data-testid="input-player-name"
              name="name"
              id="nome"
              type="text"
            />
          </label>

        </form>
        <button
          type="button"
          disabled={ this.validateEmail(email) && name.length !== 0 ? '' : 'disabled' }
          data-testid="btn-play"
          onClick={ this.tokenRequest }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => { this.setState({ redirect: true }); } }
        >
          Configurações
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestToken: () => dispatch(fetchToken()),
  namePlayer: (name) => dispatch(saveName(name)),
  emailPlayer: (email) => dispatch(saveEmail(email)),
});

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  namePlayer: PropTypes.string.isRequired,
  emailPlayer: PropTypes.string.isRequired,
  requestToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
