import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchToken, saveEmail, saveName } from '../redux/actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
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
    const { namePlayer, emailPlayer, requestToken } = this.props;
    namePlayer(name);
    emailPlayer(email);
    requestToken();
  }

  render() {
    const { email, name } = this.state;
    return (
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
  namePlayer: PropTypes.string.isRequired,
  emailPlayer: PropTypes.string.isRequired,
  requestToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
