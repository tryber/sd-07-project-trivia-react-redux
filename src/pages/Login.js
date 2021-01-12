import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, fetchToken } from '../actions';

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

  handleClick() {
    const { history, tokenAction, token } = this.props;
    history.push('/gamepage');
    tokenAction();
    localStorage.setItem('token', token);
  }

  render() {
    const { authentication, email, name } = this.state;
    const { loggingin, logged } = this.props;
    const numberCharacters = 1;
    if (logged) {
      return <Redirect to="/" />;
    }
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
            loggingin(email);
            this.handleClick();
          } }
        >
          Jogar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loggingin: (email) => dispatch(login(email)),
  tokenAction: () => dispatch(fetchToken.fetchToken()),
});

const mapStateToProps = (state) => ({
  logged: state.login,
  token: state.login.token,
});

Login.propTypes = {
  loggingin: PropTypes.func.isRequired,
  logged: PropTypes.bool.isRequired,
  tokenAction: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
