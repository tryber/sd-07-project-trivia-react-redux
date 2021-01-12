// import { render } from '@testing-library/react';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CustomLogin({ onInputChange, onHandleSubmit, validate }) {
  return (
    <form size="large">
      <input
        data-testid="input-player-name"
        maxLength="40"
        placeholder="User Name"
        name="nome"
        // onChange={(e) => onInputChange(e)}
        onChange={ onInputChange }
      />
      <input
        data-testid="input-gravatar-email"
        maxLength="50"
        placeholder="E-mail address"
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
      <Link to="/settings">
        <button
          type="button"
          data-testid="btn-settings"
        >
          Configurações
        </button>
      </Link>
    </form>
  );
}

CustomLogin.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onHandleSubmit: PropTypes.func.isRequired,
  validate: PropTypes.bool.isRequired,
};
