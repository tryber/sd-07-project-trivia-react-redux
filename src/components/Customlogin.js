// import { render } from '@testing-library/react';
import React from 'react';
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
      value={nome}
      name="nome"
      //onChange={(e) => onInputChange(e)}
      onChange={onInputChange}
    />
    <input
      data-testid="input-gravatar-email"
      maxLength="50"
      placeholder="E-mail address"
      value={email}
      name="email"
      //onChange={(e) => onInputChange(e)}
      onChange={onInputChange}
    />
    <Link to="/bichinhosFofinhos">
      <button
        onClick={onHandleSubmit}
        data-testid="btn-play"
        disabled={validate}
      >
        Jogar
      </button>
    </Link>
  </form>
);

export default CustomLogin;
