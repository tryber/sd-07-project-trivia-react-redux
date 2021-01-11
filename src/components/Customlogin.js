// import { render } from '@testing-library/react';
import React from 'react';

const CustomLogin = ({
  formData: { nome, email },
  onInputChange,
  onHandleSubmit,
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
      fluid
      placeholder="E-mail address"
      value={email}
      name="email"
      //onChange={(e) => onInputChange(e)}
      onChange={onInputChange}
    />

    <button onClick={onHandleSubmit}>Jogar</button>
  </form>
);

export default CustomLogin;
