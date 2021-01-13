import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isLoginOk from '../helpers/isLoginOk';
import { loginAction } from '../action/index';

// import { Container } from './styles';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userName: '',
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, userName } = this.state;
    const { userLoggin } = this.props;
    return (
      <div>
        <input
          onChange={ this.onChangeHandler }
          type="text"
          name="email"
          placeholder="Email"
          data-testid="input-gravatar-email"
        />
        <input
          onChange={ this.onChangeHandler }
          type="text"
          name="userName"
          data-testid="input-player-name"
          placeholder="Nome"
        />
        <button
          disabled={ isLoginOk(email, userName) }
          type="submit"
          data-testid="btn-play"
          onClick={ () => userLoggin({ email, userName }) }
        >
          Jogar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLoggin: (payload) => dispatch(loginAction(payload)),
});

Login.propTypes = {
  userLoggin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
