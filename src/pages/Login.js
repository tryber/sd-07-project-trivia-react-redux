import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { catchToken, getUser } from '../Redux/Actions';
import '../styles/index.scss';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  verifyLogin() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      return false;
    }
    return true;
  }

  async handleClick() {
    const { history } = this.props;
    const { email, name } = this.state;
    const { getUserProps, getToken } = this.props;
    const responseToken = await getToken();
    getUserProps(email, name);
    history.push('/game');
    return responseToken;
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <Link
          to="/config"
          data-testid="btn-settings"
        >
          configurações
        </Link>
        <label htmlFor="name">
          Nome do jogador
          <input
            onChange={ this.handleInput }
            value={ name }
            name="name"
            data-testid="input-player-name"
            type="text"
            id="name"
          />
        </label>

        <label htmlFor="email">
          E-mail
          <input
            onChange={ this.handleInput }
            value={ email }
            name="email"
            data-testid="input-gravatar-email"
            type="text"
            id="email"
          />
        </label>

        <button
          onClick={ this.handleClick }
          disabled={ this.verifyLogin() }
          data-testid="btn-play"
          type="button"
        >
          Jogar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUserProps: (email, name) => dispatch(getUser(name, email)),
  getToken: () => dispatch(catchToken()),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  getUserProps: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
