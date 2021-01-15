import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
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
        <form className="inputLogin">
          <label
            htmlFor="email"
            className="label"
          >
            Email
            <input
              className="input is-info"
              value={ email }
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <label
            htmlFor="name"
            className="label"
          >
            Nome
            <input
              className="input is-info"
              value={ name }
              type="text"
              name="name"
              placeholder="Name"
              id="name"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>

          <button
            className="button is-primary"
            disabled={ !isValid }
            type="button"
            data-testid="btn-play"
            onClick={ () => { actionInfo({ email, name }); this.handleChangeLogIn(); } }
          >
            Jogar
          </button>
          {loggedIn && <Redirect to="/game" />}
          <Link to="/settings">
            <button
              className="button is-info"
              type="button"
              data-testid="btn-settings"
            >
              Confirgurações
            </button>
          </Link>
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
