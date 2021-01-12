import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { catchToken, getUser } from '../Redux/Actions';

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
    const { email, name } = this.state;
    const { getUserProps, getToken } = this.props;
    const responseToken = await getToken();
    console.log(responseToken);
    getUserProps(email, name);
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <input
          onChange={ this.handleInput }
          value={ name }
          name="name"
          data-testid="input-player-name"
          type="text"
        />
        <input
          onChange={ this.handleInput }
          value={ email }
          name="email"
          data-testid="input-gravatar-email"
          type="text"
        />
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
