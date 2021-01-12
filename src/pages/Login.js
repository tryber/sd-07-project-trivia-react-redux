import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { catchToken, getUser } from '../Redux/Actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      redirect: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
  }

  setRedirect() {
    this.setState({
      redirect: true,
    });
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
    const { email, name } = this.state;
    const { getUserProps, getToken } = this.props;
    const responseToken = await getToken();
    console.log(responseToken);
    getUserProps(name, email);

    this.setRedirect();
  }

  renderRedirect() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/game" />;
    }
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        { this.renderRedirect() }
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
  getUserProps: (email, name) => dispatch(getUser(email, name)),
  getToken: () => dispatch(catchToken()),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  getUserProps: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
};
