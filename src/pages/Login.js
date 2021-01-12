import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addInfo from '../store/ducks/UserInfo/actions';
import handleAsync from '../store/ducks/TokenRequest/actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      isValid: false,
      loggedIn: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.isvalid = this.isvalid.bind(this);
    this.handleChangeLogIn = this.handleChangeLogIn.bind(this);
  }

  isvalid() {
    const { email, name } = this.state;
    if (email !== '' && name !== '') {
      return this.setState({ isValid: true });
    }
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value }, this.isvalid);
  }

  async handleChangeLogIn() {
    const { fetchToken } = this.props;
    this.setState({ loggedIn: true });
    const token = await fetchToken();
    return token;
  }

  render() {
    const { actionInfo } = this.props;
    const { email, name, isValid, loggedIn } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email
            <input
              value={ email }
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="name">
            Nome
            <input
              value={ name }
              type="text"
              name="name"
              placeholder="name"
              id="name"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>

          <button
            disabled={ !isValid }
            type="button"
            data-testid="btn-play"
            onClick={ () => { actionInfo({ email, name }); this.handleChangeLogIn(); } }
          >
            Jogar
          </button>
          {loggedIn && <Redirect to="/game" />}
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ TokenRequest: { token } }) => ({
  token,
});

const mapDispatchToProps = { actionInfo: addInfo, fetchToken: handleAsync };

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  actionInfo: PropTypes.func.isRequired,
  fetchToken: PropTypes.func.isRequired,
};
