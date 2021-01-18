import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoginForm = ({ handleChange, handleClick, name, email, auth }) => (
  <>
    <input
      type="text"
      id="name"
      placeholder="Insira seu nome"
      onChange={ (e) => handleChange(e) }
      value={ name }
      data-testid="input-player-name"
    />
    <input
      type="text"
      id="email"
      placeholder="Insira seu email"
      onChange={ (e) => handleChange(e) }
      value={ email }
      data-testid="input-gravatar-email"
    />

    <Link to="/game">
      <button
        type="button"
        disabled={ !auth }
        data-testid="btn-play"
        onClick={ handleClick }
      >
        Jogar
      </button>
    </Link>
  </>
);

export default LoginForm;

LoginForm.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  auth: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};
