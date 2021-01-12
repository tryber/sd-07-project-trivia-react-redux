// import { render } from '@testing-library/react';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CustomLogin = ({
  formData: { nome, email },
  onInputChange,
  onHandleSubmit,
  validate,
}) => (
  <form size="large">
    <input
      data-testid="input-player-name"
      maxLength="40"
      placeholder="User Name"
      value={ nome }
      name="nome"
      // onChange={(e) => onInputChange(e)}
      onChange={ onInputChange }
    />
    <input
      data-testid="input-gravatar-email"
      maxLength="50"
      placeholder="E-mail address"
      value={ email }
      name="email"
      // onChange={(e) => onInputChange(e)}
      onChange={ onInputChange }
    />
    <Link to="/gamescreen">
      <button
        type="button"
        onClick={ onHandleSubmit }
        data-testid="btn-play"
        disabled={ validate }
      >
        Jogar
      </button>
    </Link>
  </form>
);

export default CustomLogin;

CustomLogin.propTypes = {
  formData: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onHandleSubmit: PropTypes.func.isRequired,
  validate: PropTypes.bool.isRequired,
};
