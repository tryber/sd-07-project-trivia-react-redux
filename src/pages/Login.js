import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../actions';

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

  render() {
    const { authentication, email, name } = this.state;
    const { loggingin, logged } = this.props;
    const numberCharacters = 1;
    const { history } = this.props;

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
          onClick={ () => loggingin(name, email) }
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
  loggingin: (nome, email) => dispatch(login(nome, email)),
});

const mapStateToProps = (state) => ({
  logged: state.login,
});

Login.propTypes = {
  loggingin: PropTypes.func.isRequired,
  logged: PropTypes.bool.isRequired,
  history: PropTypes.func.isRequired,
};

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
