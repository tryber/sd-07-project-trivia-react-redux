import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormLogin extends Component {
  render() {
    const { handleChange, validateImputs } = this.props;
    return (
      <div>
        <label htmlFor="username">
          <input
            type="text"
            data-testid="input-player-name"
            placeholder="Username"
            id="username"
            name="name"
            onChange={ (event) => handleChange(event) }
          />
        </label>
        <br />
        <label htmlFor="user-email">
          <input
            type="email"
            data-testid="input-gravatar-email"
            placeholder="Email"
            id="user-email"
            name="email"
            onChange={ (event) => handleChange(event) }
          />
        </label>
        <br />
        <button
          data-testid="btn-play"
          type="button"
          disabled={ validateImputs() }
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default FormLogin;

FormLogin.propTypes = {
  handleChange: PropTypes.func.isRequired,
  validateImputs: PropTypes.func.isRequired,
};
